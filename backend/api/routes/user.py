
from app import app, mail
from . import login_required, bad_request, created_request
from flask import jsonify, request
from db import db, User, Department, Role, UserRoles
from sqlalchemy.exc import IntegrityError
from setting import MAX_USER_PER_PAGE
from dateutil import parser as TimeParser
from secrets import token_urlsafe
from flask_mail import Message
from flask import render_template
import json
import phonenumbers
import smtplib


@app.route('/api/user/email/verify', methods=["POST"])
@login_required()
def email_verify():

    data = request.get_json()

    if "token" not in data:
        return bad_request("Missing token")

    user = request.session.user

    if user.email_token != data['token']:
        return jsonify({
            'status': "FAIL",
            'err': "INVALID_CODE"
        })
    try:
        user.email = user.new_email
        user.new_email = None
        user.email_token = None
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({
            'status': "FAIL",
            'err': "EXIST_ERR"
        })

    return jsonify({
        'status': "OK"
    })


@app.route('/api/user/add', methods=['POST'])
@login_required(role_allow=['manager', 'administrator'])
def add_user() -> jsonify:
    """

        This route is dedicated to adding new user to the system

        Returns:
            jsonify : HTTP response
    """

    data = request.get_json()

    # Validate the incoming request
    if "email" not in data or \
        "passwd" not in data or \
        "department" not in data or \
        "name" not in data or \
            "role" not in data:
        return bad_request('Missing parameter')

    if not data['passwd']:
        return bad_request("Missing password")

    if (type(data['role']) == str and not data['role'].isdigit()) or \
            (type(data['department']) == str and not data['department'].isdigit()):
        return bad_request('Invalid argument')

    department = db.session.query(Department).filter(
        Department.id == int(data['department'])).first()
    role = db.session.query(Role).filter(Role.id == int(data['role'])).first()

    if not department:
        return bad_request('Invalid department id')
    if not role:
        return bad_request('Invalid role id')

    # Creating new user and add to the system
    try:
        user = User(
            username=data['name'],
            password=data['passwd'],
            department=department.id,
            email=data['email']
        )
        db.session.add(user)
        db.session.flush()
    except IntegrityError:
        db.session.rollback()
        return created_request('Account with this email/name has already existed')

    # Creating a new role record for this user
    new_role = UserRoles(userid=user.id, roleid=role.id)
    db.session.add(new_role)
    db.session.commit()

    return jsonify({
        'status': "OK"
    })


@app.route('/api/user/delete/<user_id>', methods=['DELETE'])
@login_required(role_allow=['manager', 'administrator'])
def delete_user(user_id: str) -> jsonify:
    """
        This route is dedicated to deleting existing user out of the system

        Returns:
            jsonify : HTTP response
    """

    if not user_id.isdigit():
        return jsonify({
            'status': "FAIL",
            'err': "Invalid user id."
        })

    user = db.session.query(User).filter(User.id == int(user_id)).first()

    if not user:
        return jsonify({
            'status': "FAIL",
            'err': "User doesn't exist."
        })

    if user.id == request.session.user.id:
        return jsonify({
            'status': "FAIL",
            'err': "It's not recommended to delete your own account."
        })

    db.session.delete(user)
    db.session.commit()

    return jsonify({
        'status': "OK"
    })


@app.route('/api/user/list', methods=['POST', "GET"])
@login_required(role_allow=['manager', 'administrator'])
def list_all_users() -> jsonify:
    """
        This route is dedicated to listing all existing users inside the system

        Returns:
            jsonify : HTTP response
    """

    data = request.get_json()

    if 'page' not in data:
        return bad_request('Missing argument')

    if type(data['page']) != int:
        return bad_request('Invalid page number')

    ret = db.session.query(User).offset(
        data['page']*MAX_USER_PER_PAGE).limit(MAX_USER_PER_PAGE).all()

    return jsonify([
        {
            'id': user.id,
            'name': user.username,
            'did': user.department_id,  # Department id
            'email': user.email,
            'created': user.created_on
        } for user in ret
    ]), 200


@app.route('/api/user/get/<user_id>', methods=['POST', "GET"])
@login_required(allow_personal_user=True)
def get_user_info(user_id):

    if not user_id.isdigit():
        return jsonify({
            'status': "FAIL",
            'err': "Invalid user id"
        })

    user = db.session.query(User).filter(User.id == int(user_id)).first()

    if not user:
        return jsonify({
            'status': "FAIL",
            'err': "User doesn't exist"
        })

    return jsonify({
        'status': "OK",
        'data': {
            'id': user.id,
            'name': user.username,
            'did': user.department_id,
            'email': user.email,
            'created': user.created_on,
            'phone': user.phone,
            'address': user.address,
            'theme': user.theme,
            'language': user.language,
            'gender': user.gender,
            'birthday': user.birthday,
            'roles': list([urole.role.name for urole in user.userrole_ref.all()])
        }
    })


def change_user_info(user, data):

    if not user:
        return bad_request("User with this id doesn't exist")
    if "name" in data:
        # Updating the username only
        try:
            user.username = data['name'].strip()
            db.session.flush()
        except IntegrityError:
            db.session.rollback()
            return created_request('This username has already existed')

    if "email" in data:
        # Updating the email only
        email = data['email'].strip()
        check = db.session.query(User.email).filter(
            User.email == email).first()

        if check:
            return jsonify({
                'status': "FAIL",
                'err': "This email has already been used"
            })

        code = token_urlsafe(100)
        user.email_token = code
        user.new_email = email

        # Creating a message which send to the user email later

        msg = Message('Verify your email',
                      sender=app.config.get("MAIL_USERNAME"),
                      recipients=[email])
        msg.html = render_template(
            'email_verify.html', username=user.username, url=user.craft_verify_url(code))
        try:
            mail.send(msg)
        except smtplib.SMTPRecipientsRefused:
            pass

    if "phone" in data:
        # Updating the phone number only
        try:

            number = phonenumbers.parse(data['phone'])
            if not phonenumbers.is_possible_number(number):
                db.session.rollback()
                return jsonify({
                    'status': "FAIL",
                    'err': "Invalid phone number"
                })

            user.phone = data['phone'].strip()
            db.session.flush()
        except phonenumbers.phonenumberutil.NumberParseException:
            db.session.rollback()
            return jsonify({
                'status': "FAIL",
                'err': "Missing or invalid region code."
            })
        except IntegrityError:
            db.session.rollback()
            return created_request('This phone number has already been used')

    if "birthday" in data:
        # Updating the birthday only
        try:
            user.birthday = TimeParser.parse(data['birthday'].strip())
            db.session.flush()
        except:
            db.session.rollback()
            return jsonify({
                'status': "FAIL",
                'err': "Unexpected error occurred while setting birthday."
            }), 500

    if "gender" in data:
        # Updating the gender only
        try:
            user.gender = data['gender'].strip()
            db.session.flush()
        except IntegrityError:
            db.session.rollback()
            return jsonify({
                'status': "FAIL",
                'err': "Invalid gender."
            }), 500

    if "address" in data:
        # Updating the address only
        try:
            user.address = data['address'].strip()
            db.session.flush()
        except:
            db.session.rollback()
            return jsonify({
                'status': "FAIL",
                'err': "Unexpected error occurred while setting address."
            }), 500

    if "passwd" in data:
        # Updating the password only

        if "cpass" not in data:
            # if there is no confirm password
            return bad_request('Missing confirm password.')

        if not user.check_password(data['cpass']):
            return jsonify({
                'status': "FAIL",
                'err': "INVALID_PASS"
            })

        try:
            user.set_new_password(data['passwd'].strip())
            db.session.flush()
        except:
            db.session.rollback()
            return jsonify({
                'status': "FAIL",
                'err': "Unexpected error occurred while setting new password."
            }), 500

    if "theme" in data:
        try:
            user.theme = data['theme'].strip()
            db.session.flush()
        except IntegrityError:
            db.session.rollback()
            return bad_request('Invalid theme')

    if "language" in data:
        try:
            user.language = data['language'].strip()
            db.session.flush()
        except IntegrityError:
            db.session.rollback()
            return bad_request('Invalid language')

    db.session.commit()


@app.route('/api/user/<user_id>/role/update', methods=["POST"])
@login_required(role_allow=["manager", "administrator"])
def add_new_role(user_id):

    # There has to be {
    #    "role" : ID_HERE,
    #    "action" : False = Delete, True =
    # }

    data = request.get_json()

    if "action" not in data or "role" not in data:
        return jsonify({
            'status': "FAIL",
            'err': "Missing parameters."
        })

    if not user_id.isdigit():
        return jsonify({
            'status': "FAIL",
            'err': "Invalid user id."
        })

    user = db.session.query(User).filter(User.id == int(user_id)).first()
    check_role = user.userrole_ref.filter(
        UserRoles.roleid == data['role']).first()

    if data['action']:

        # Adding a new role

        if check_role:
            # Checking if this role has already been added to this user
            return jsonify({
                'status': "FAIL",
                'err': "This role has already been added."
            })

        try:

            new_role = UserRoles(userid=user.id, roleid=data['role'])
            db.session.add(new_role)
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            return jsonify({
                'status': "FAIL",
                'err': 'Invalid role id'
            })
    else:
        if check_role:

            if user.userrole_ref.count() <= 1:
                return jsonify({
                    'status': "FAIL",
                    'err': "Unable to delete the last role of this user."
                })

            db.session.delete(check_role)
            db.session.commit()

        else:
            return jsonify({
                'status': "FAIL",
                'err': "Role doesn't exist"
            })

    return jsonify({
        'status': "OK"
    })


@app.route('/api/user/update/<user_id>', methods=['POST'])
@login_required(allow_personal_user=True)
def update_user_info(user_id):

    data = request.get_json()

    if not user_id.isdigit():
        return jsonify({
            'status': "FAIL",
            'err': "Invalid user id."
        })

    user = db.session.query(User).filter(User.id == int(user_id)).first()

    ret = change_user_info(user, data)
    if ret:
        return ret

    return jsonify({
        'status': "OK"
    })


@app.route('/api/user/update', methods=["POST"])
@login_required()
def update_self_info():

    data = request.get_json()

    ret = change_user_info(request.session.user, data)
    if ret:
        return ret

    return jsonify({
        'status': "OK"
    })


@app.route('/api/user/<user_id>/role/update', methods=['POST'])
@login_required(allow_personal_user=True)
def update_user_role(user_id):

    if not user_id.isdigit():
        return bad_request('Invalid user id')

    data = request.get_json()

    if "new_role" not in data:
        return bad_request('Missing argument')

    role_list = set(data['new_role'])

    ret = db.session.query(UserRoles).filter(UserRoles.userid == int(user_id)).filter(UserRoles.roleid.in_(
        role_list
    )).all()

    for record in ret:
        role_list.remove(record.roleid)

    try:
        db.session.add_all([
            UserRoles(userid=int(user_id), roleid=new_role) for new_role in role_list
        ])
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return bad_request('Invalid role id detected')

    return jsonify({
        'status': "OK"
    })


@app.route('/api/user/<user_id>/export', methods=["GET", 'POST'])
@login_required(allow_personal_user=True)
def export_user_config(user_id):
    if not user_id.isdigit():
        return bad_request('Invalid user id')

    user = db.session.query(User).filter(User.id == int(user_id)).first()

    if not user:
        return bad_request('User doesn\'t exist')

    return jsonify({
        "username": f"{user.username}",
        "email": f"{user.email}",
        "phone": user.phone,
        "theme": f"{user.theme}",
        "language": f"{user.language}",
        "birthday": user.birthday,
        "gender": f"{user.gender}",
        "address": f"{user.address}"
    })


@app.route('/api/user/<user_id>/import', methods=['POST'])
@login_required(allow_personal_user=True)
def import_user_config(user_id):

    if not user_id.isdigit():
        return bad_request('Invalid user id')

    if not request.files.get('file'):
        return bad_request('Missing file')

    user = db.session.query(User).filter(User.id == int(user_id)).first()

    if not user:
        return jsonify({
            'status': "FAIL",
            'msg': 'User doesn\'t exist'
        })

    config_file = request.files['file']

    try:
        content = config_file.read().decode()
        json_content = json.loads(content)

        for (key, value) in json_content.items():
            # Some of this can be null, so i have to write a if clause first
            # before executing
            (setattr(user, key, TimeParser.parse(value.strip())
             if key == "birthday" else value) if value else None)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({
            'status': "FAIL",
            'msg': 'Unable to import, either the name or email may have already existed, or the file is malformed'
        })
    except:
        return jsonify({
            'status': "FAIL",
            'msg': 'Invalid configuration'
        })

    return jsonify({
        'status': "OK"
    })
