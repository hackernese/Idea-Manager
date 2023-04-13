from app import app
from setting import (
    DATABASE_URI, DEFAULT_USER_LIST, TOKEN_EXPIRY_DAYS,
    DEFAULT_DEPARTMENT, DEFAULT_ROLE_LIST, RECOVERY_URL_BASE,
    SSL, FRONTEND_PORT, RECOVERY_TOKEN_EXPIRY_MINUTES
)
from base64 import b64encode as encode64
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta, datetime
from secrets import token_urlsafe
from sqlalchemy import event
from enum import Enum
from random import randint
from sqlalchemy import text
from sqlalchemy.schema import CheckConstraint


# ----- Setting configuration and the database ----------------_#
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI
db = SQLAlchemy(app)
# ---------------------------------------------------------------#


# ----- Caching value----------#

# Caching and storing the role id in memory for faster access
ROLE_ID_LIST = None
MANAGER_ID = None
ADMIN_ID = None
STAFF_ID = None
COORDINATOR_ID = None
# -----------------------------#


# ----------------- Defining models ----------------------------#
class AbstractBase(db.Model):

    # Abstract class which holds all of the common / repeating properties

    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    created_on = db.Column(db.DateTime, default=db.func.now())
    updated_on = db.Column(
        db.DateTime, default=db.func.now(), onupdate=db.func.now())


class UserRoles(AbstractBase):
    userid = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    roleid = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=False)


class User(AbstractBase):
    # Necessary columns....
    username = db.Column(db.String(80), unique=True, nullable=False)
    # Maximum length of email is 345 chars
    email = db.Column(db.String(345), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey(
        "department.id"), nullable=False)

    # Optional columns / fields...
    # maximum length of phone number is 15 chars
    phone = db.Column(db.String(15), nullable=True, unique=True)
    birthday = db.Column(db.DateTime, nullable=True)
    gender = db.Column(db.String(50), nullable=False, default="others")
    address = db.Column(db.Text, nullable=True)
    theme = db.Column(db.String(50), default="light")
    language = db.Column(db.String(50), default="en")

    # When the user updates their new email, it is going to send a new code to their new email for verification
    # if the user access the link in the mail, it is going to compare the code to email_token and if it's correct
    # then update the current mail with the "new_email" below
    email_token = db.Column(db.String(100), default=None,
                            nullable=True, unique=True)
    new_email = db.Column(db.String(345), default=None, nullable=True)

    __table_args__ = (
        CheckConstraint(gender.in_(
            ['male', 'female', 'others', 'unknown']), name='gender_con'),
        CheckConstraint(theme.in_(['light', 'dark']), name='theme_con'),
        CheckConstraint(language.in_(['vn', 'en']), name='lang_con')
    )

    # References to other tables / models / classes
    idea_ref = db.relationship(
        'Idea', backref='user', lazy="dynamic", cascade='all, delete')
    userrole_ref = db.relationship(
        'UserRoles', backref='user', lazy="dynamic", cascade='all, delete')
    session_ref = db.relationship(
        'Sessions', backref='user', lazy=True, cascade='all, delete')
    recover_ref = db.relationship(
        'RecoverAccountDB', backref='user', lazy=True, cascade='all, delete')
    reaction_ref = db.relationship(
        'Reaction', backref='user', lazy='dynamic', cascade='all, delete')
    logins_ref = db.relationship(
        'Logins', backref='use', lazy=True, cascade='all, delete')

    view_ref = db.relationship(
        'Views', backref='user', lazy=True, cascade='all, delete')

    def craft_verify_url(self, code):
        protocol = "http" if not SSL else "https"
        return f"{protocol}://{RECOVERY_URL_BASE}:{FRONTEND_PORT}/mail_verify?token={code}"

    def __init__(self, username, password, email, department) -> None:
        self.username = username.strip()
        self.password = generate_password_hash(password.strip())
        self.email = email.strip()
        self.department_id = int(department)

    def __repr__(self):
        return '<User %r>' % self.username

    def set_new_password(self, passwd):
        self.password = generate_password_hash(passwd.strip())

    def check_password(self, passwd):

        if check_password_hash(self.password, passwd.strip()):
            return True

        return False

    def is_admin(self):
        return bool(self.userrole_ref.filter(UserRoles.id == ADMIN_ID).first())

    def is_manager(self):
        return bool(self.userrole_ref.filter(UserRoles.id == MANAGER_ID).first())

    def is_staff(self):
        return bool(self.userrole_ref.filter(UserRoles.id == STAFF_ID).first())

    def is_coordinator(self):
        return bool(self.userrole_ref.filter(UserRoles.id == COORDINATOR_ID).first())


class Logins(AbstractBase):

    userid = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    location = db.Column(db.String(50), nullable=False, default="Unknown")
    ip = db.Column(db.String(30), nullable=False, default="Unknown")
    browser = db.Column(db.String(30), nullable=False, default='Unknown')
    os = db.Column(db.String(30), nullable=False, default="Unknown")

    @property
    def getinfo(self):
        return {
            'id': self.id,
            'location': self.location,
            'browser': self.browser,
            'os': self.os,
            'date': self.created_on
        }


class Sessions(AbstractBase):

    token = db.Column(db.String(100), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    expiry_time = db.Column(
        db.DateTime, default=datetime.now() + timedelta(days=TOKEN_EXPIRY_DAYS))

    def __init__(self, user_id) -> None:
        self.user_id = user_id
        self.token = token_urlsafe(100)

    def check_expiry(self) -> None | bool:

        if datetime.now() >= self.expiry_time:
            return True

        return False


class Category(AbstractBase):
    name = db.Column(db.String(100), unique=True, nullable=False)
    idea_ref = db.relationship(
        "Idea", backref='category', lazy=True, cascade='all, delete')


class Submission(AbstractBase):
    name = db.Column(db.String(200), nullable=False, unique=True)
    deadline1 = db.Column(db.DateTime, nullable=False)
    deadline2 = db.Column(db.DateTime, nullable=False)

    reference = db.relationship(
        'Idea', backref='submission', lazy='dynamic', cascade='all, delete')


class Department(AbstractBase):

    name = db.Column(db.String(200), nullable=False)

    # Reference to the user table
    reference = db.relationship(
        'User', backref='department', lazy=True, cascade='all, delete')


class Views(AbstractBase):

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    idea_id = db.Column(db.Integer, db.ForeignKey("idea.id"), nullable=False)


class Idea(AbstractBase):

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    is_anonymous = db.Column(db.Boolean, default=False, nullable=False)

    title = db.Column(db.Text, nullable=False)
    brief = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    doc_file = db.Column(db.String(64), unique=True, nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey(
        "category.id"), nullable=False)
    sub_id = db.Column(db.Integer, db.ForeignKey(
        "submission.id"), nullable=False)

    # Reference to the user table
    react_ref = db.relationship(
        'Reaction', backref='idea', lazy='dynamic', cascade='all, delete')
    comment_ref = db.relationship(
        'Comments', backref='idea', lazy=True, cascade='all, delete')
    view_ref = db.relationship(
        'Views', backref="idea", lazy=True, cascade='all, delete'
    )


class Reaction(AbstractBase):
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    idea_id = db.Column(db.Integer, db.ForeignKey("idea.id"), nullable=False)

    react = db.Column(db.Boolean, nullable=True)


class Comments(AbstractBase):
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    idea_id = db.Column(db.Integer, db.ForeignKey("idea.id"), nullable=False)
    is_anonymous = db.Column(db.Boolean, default=False, nullable=False)
    comment = db.Column(db.Text, nullable=False)


class Role(AbstractBase):
    name = db.Column(db.String(100), unique=True, nullable=False)
    mandatory = db.Column(db.Boolean, nullable=False, default=False)
    # If this is set to True then this role cannot be deleted, it is necessary

    userrole_ref = db.relationship(
        "UserRoles", backref='role', lazy=True, cascade='all, delete')


class RecoverAccountDB(AbstractBase):
    url_token = db.Column(db.String(100), unique=True, nullable=False)
    recover_code = db.Column(db.Integer, nullable=False)
    # 6 digits code
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    expiry_time = db.Column(db.DateTime)
    # After this expired date, the token and the link is no longer usable

    unique_identifier = db.Column(db.String(100), unique=True, nullable=False)

    # Why having a "unique_identifier" ?
    # The overall process of recovering password is something like this

    # Forgot --> Send email -> Open up "Code" form ---> Give the code --> Retype password
    #                       |                                          ^
    #                       |                                          |
    #                       `--> Click link ---------------------------'

    # If the user accidentally close the "Code form", they will wish to reopen it back
    # but if they reopen it back without anything, it's kinda tricky to verify the recovery code
    # Like since the code can be the same for multiple users, how can we check which code it is ?
    # So let's generate a unique identifier and send along with it, which is the lengthy field
    # from above

    # And in order to have a clear and visible "Code form", the identifier has to be append in the
    # GET parameter as well... sometthing like /recovery/code?i=<identifier here>

    def __init__(self, user_id) -> None:
        self.user_id = user_id
        self.url_token = token_urlsafe(100)
        self.recover_code = randint(100000, 999999)
        self.unique_identifier = token_urlsafe(100)

    def re_random_code(self):
        self.recover_code = randint(100000, 999999)

    def craft_url(self):

        # Crafting a URL for recovery purposes

        protocol = "http" if not SSL else "https"

        return f"{protocol}://{RECOVERY_URL_BASE}:{FRONTEND_PORT}/recovery/reset?token={self.url_token}"
# ---------------------------------------------------------------#


# ----- Database events hooks ------------

@event.listens_for(Department.__table__, "after_create")
def insert_default_record(*args, **kwargs):
    db.session.add_all([Department(name=i) for i in DEFAULT_DEPARTMENT])
    db.session.commit()


@event.listens_for(Role.__table__, "after_create")
def insert_default_record(*args, **kwargs):
    db.session.add_all([Role(name=i['r'], mandatory=i['m'])
                       for i in DEFAULT_ROLE_LIST])
    db.session.commit()


@event.listens_for(UserRoles.__table__, "after_create")
def insert_default_record(*args, **kwargs):

    for record in DEFAULT_USER_LIST:

        department = db.session.query(Department).filter(
            Department.name == record['department']).first()
        role = db.session.query(Role).filter(
            Role.name == record['role']).first()

        user = User(
            username=record['name'],
            email=record['email'],
            department=department.id,
            password=record['pass']
        )
        db.session.add(user)
        db.session.flush()
        db.session.add(UserRoles(
            userid=user.id,
            roleid=role.id
        ))

        db.session.commit()


@event.listens_for(Logins.__table__,  "after_create")
def insert_default_record(*args, **kwargs):
    db.session.add_all([Logins(os="iOS", ip="127.0.0.1", location="Ha Noi",
                       userid=3, browser='Chrome') for i in range(25)])
    db.session.commit()


with app.app_context():
    db.create_all()
    # Creating the database IF NOT EXISTS

    db.session.execute(text("PRAGMA foreign_keys = ON"))
    # Enable foreign key support in SQLite3 ( Either remove or ignore once deployed to MySQL )

    # Caching and storing the role id in memory for faster access
    ROLE_ID_LIST = {rec.name: rec.id for rec in db.session.query(Role).all()}
    MANAGER_ID = ROLE_ID_LIST['manager']
    ADMIN_ID = ROLE_ID_LIST['administrator']
    COORDINATOR_ID = ROLE_ID_LIST['coordinator']
    STAFF_ID = ROLE_ID_LIST['staff']
