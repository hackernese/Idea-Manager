
from app import app
from . import login_required, bad_request, created_request
from flask import jsonify, request
from db import db, Sessions, User, Department, Role, UserRoles
from sqlalchemy.exc import IntegrityError
from setting import MAX_USER_PER_PAGE
from dateutil import parser as TimeParser
import json

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

    if ( type(data['role'])==str and not data['role'].isdigit() ) or \
        ( type(data['department'])==str and not data['department'].isdigit() ):
        return  bad_request('Invalid argument')

    department = db.session.query(Department).filter(Department.id==int(data['department'])).first()
    role = db.session.query(Role).filter(Role.id==int(data['role'])).first()

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
        'status' :"OK"
    })

@app.route('/api/user/delete/<user_id>', methods=['DELETE'])
@login_required(role_allow=['manager', 'administrator'])
def delete_user(user_id : str) -> jsonify:

    """
        This route is dedicated to deleting existing user out of the system

        Returns:
            jsonify : HTTP response
    """

    if not user_id.isdigit():
        return jsonify({
            'status' : "FAIL",
            'err' : "Invalid user id."
        })

    user = db.session.query(User).filter(User.id==int(user_id)).first()

    if not user:
        return jsonify({
            'status' : "FAIL",
            'err' : "User doesn't exist."
        })

    db.session.delete(user)
    db.session.commit()

    return jsonify({
        'status' : "OK"
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

    if type(data['page'])!=int:
        return bad_request('Invalid page number')

    ret = db.session.query(User).offset(data['page']*MAX_USER_PER_PAGE).limit(MAX_USER_PER_PAGE).all()

    return jsonify([
        {
            'id' : user.id,
            'name' : user.username,
            'did' : user.department_id, # Department id
            'email' : user.email,
            'created' : user.created_on
        } for user in ret
    ]), 200

@app.route('/api/user/get/<user_id>', methods=['POST', "GET"])
@login_required(allow_personal_user=True)
def get_user_info(user_id):

    if not user_id.isdigit():
        return jsonify({
            'status' : "FAIL",
            'err' : "Invalid user id"
        })


    user = db.session.query(User).filter(User.id==int(user_id)).first()

    if not user:
        return jsonify({
            'status' : "FAIL",
            'err' : "User doesn't exist"
        })

    return jsonify({
        'status' : "OK",
        'data' : {
            'id' : user.id,
            'name': user.username,
            'did': user.department_id,
            'email' : user.email,
            'created' : user.created_on,
            'phone' : user.phone,
            'address' : user.address,
            'theme' : user.theme,
            'language' : user.language,
            'gender' : user.gender,
            'birthday' : user.birthday
        }
    })

@app.route('/api/user/update/<user_id>', methods=['POST'])
@login_required(allow_personal_user=True)
def update_user_info(user_id):

    data = request.get_json()

    if not user_id.isdigit():
        return jsonify({
            'status' : "FAIL",
            'err' : "Invalid user id."
        })

    user = db.session.query(User).filter(User.id==int(user_id)).first()

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
        try:
            user.email = data['email'].strip()
            db.session.flush()
        except IntegrityError:
            db.session.rollback()
            return created_request('This email has already been used')

    if "phone" in data:
        # Updating the phone number only
        try:
            user.phone = data['phone'].strip()
            db.session.flush()
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
                'status' : "FAIL",
                'err' : "Unexpected error occurred while setting birthday."
            }), 500

    if "gender" in data:
        # Updating the gender only
        try:
            user.gender = data['gender'].strip()
            db.session.flush()
        except IntegrityError:
            db.session.rollback()
            return jsonify({
                'status' : "FAIL",
                'err' : "Invalid gender."
            }), 500

    if "address" in data:
        # Updating the address only
        try:
            user.address = data['address'].strip()
            db.session.flush()
        except:
            db.session.rollback()
            return jsonify({
                'status' : "FAIL",
                'err' : "Unexpected error occurred while setting address."
            }), 500

    if "passwd" in data:
        # Updating the password only
        try:
            user.set_new_password( data['passwd'].strip())
            db.session.flush()
        except:
            db.session.rollback()
            return jsonify({
                'status' : "FAIL",
                'err' : "Unexpected error occurred while setting new password."
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

    return jsonify({
        'status' : "OK"
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

    ret = db.session.query(UserRoles).filter(UserRoles.userid==int(user_id)).filter(UserRoles.roleid.in_(
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
        'status' : "OK"
    })

@app.route('/api/user/<user_id>/export', methods=["GET",'POST'])
@login_required(allow_personal_user=True)
def export_user_config(user_id):
    if not user_id.isdigit():
        return bad_request('Invalid user id')

    user = db.session.query(User).filter(User.id==int(user_id)).first()

    if not user:
        return bad_request('User doesn\'t exist')

    return jsonify({
        "username" : f"{user.username}",
        "email" : f"{user.email}",
        "phone" : f"{user.phone}",
        "theme" : f"{user.theme}",
        "language" : f"{user.language}",
        "birthday" : f"{user.birthday}",
        "gender" : f"{user.gender}",
        "address" : f"{user.address}",
        "oauth" : f"{user.oauth}"
    })

@app.route('/api/user/<user_id>/import', methods=['POST'])
@login_required(allow_personal_user=True)
def import_user_config(user_id):

    if not user_id.isdigit():
        return bad_request('Invalid user id')

    if 'file' not in request.files:
        return bad_request('Missing file')

    user = db.session.query(User).filter(User.id==int(user_id)).first()

    if not user:
        return bad_request('User doesn\'t exist')


    config_file = request.files['file']

    try:
        content =config_file.read().decode()
        json_content = json.loads(content)

        for (key, value) in json_content.items():
            # Some of this can be null, so i have to write a if clause first
            # before executing
            (setattr(user, key, TimeParser.parse(value.strip()) if key=="birthday" else value) if value else None)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return  bad_request('Unable to import, either the name or email may have already existed, or the file is malformed')

    except:
        return  bad_request('Invalid configuration')

    return jsonify({
        'status' : "OK"
    })

@app.route('/api/user/<user_id>/email', methods=["GET",'POST'])
@login_required(allow_personal_user=True)
def grab_user_emails(user_id):
    return ""



