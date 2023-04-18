from app import app
from . import login_required, bad_request
from db import db, Role, Sessions
from flask import request, jsonify
from sqlalchemy.exc import IntegrityError


@app.route('/api/role/add', methods=['POST'])
@login_required(role_allow=['manager', 'administrator'])
def add_role() -> jsonify:
    """
        This route is dedicated to add new role to the database
        Returns:
            jsonify : HTTP response
    """

    data = request.get_json()

    if "role" not in data:
        return bad_request('Missing parameter')

    new_role = Role(name=data['role'].strip())

    try:

        db.session.add(new_role)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({
            'err': "This role has already existed",
            'status': "FAIL"
        }), 201

    return jsonify({
        'status': "OK"
    })


@app.route('/api/role/delete/<role_id>', methods=['DELETE'])
@login_required(role_allow=['manager', 'administrator'])
def delete_role(role_id: int) -> jsonify:
    """

        This route is dedicated to delete existing role out of the database

        Returns:
            jsonify : HTTP response
    """

    if not role_id.isdigit():
        return bad_request('Invalid argument')

    ret = db.session.query(Role).filter(Role.id == int(role_id)).first()

    if not ret:
        return jsonify({
            'status': "FAIL",
            'err': "Role doesn't exist"
        }), 404

    if ret.mandatory == True:
        return bad_request('This role can\'t be deleted, it\'s mandatory')

    db.session.delete(ret)
    db.session.commit()

    return jsonify({
        'status': "OK"
    })


@app.route('/api/role/list', methods=['POST', "GET"])
@login_required(role_allow=['manager', 'administrator'])
def list_all_roles() -> jsonify:
    """

        This route is dedicated to list out the information of all of the
        existing roles inside the database

        Returns:
            jsonify : HTTP response

    """

    return jsonify({
        'status': "OK",
        'data': [
            {
                'id': i.id,
                'name': i.name,
                'created': i.created_on
            } for i in db.session.query(Role).all()
        ]
    })


@app.route('/api/role/get/<role_id>', methods=['POST', "GET"])
@login_required(role_allow=['manager', 'administrator'])
def get_role_info(role_id: int) -> jsonify:
    """

        This route is dedicated to extract the information about a specific
        role only, not all roles

        Returns:
            jsonify : HTTP response

    """

    if not role_id.isdigit():
        return bad_request('Invalid argument')

    ret = db.session.query(Role).filter(Role.id == int(role_id)).first()

    if not ret:
        return jsonify({
            'status': "FAIL",
            'err': "Specified role doesn't exist"
        }), 404

    return jsonify({
        'status': "OK",
        'data': {
            'id': ret.id,
            'name': ret.name,
            'created': ret.created_on
        }
    })


@app.route('/api/role/update/<role_id>', methods=['POST'])
@login_required(role_allow=['manager', 'administrator'])
def update_role_info(role_id: int) -> jsonify:
    """

        This route is dedicated to updating the information of
        an existing role inside the database

        Returns:
            jsonify : HTTP response

    """

    data = request.get_json()

    if "name" not in data:
        return bad_request('Missing parameter')

    role = db.session.query(Role).filter(Role.id == int(role_id)).first()

    if not role:
        return jsonify({
            'err': "Role doesn't exist",
            'status': "FAIL"
        }), 404

    try:

        role.name = data['name'].strip()
        db.session.commit()

    except IntegrityError:
        db.session.rollback()
        return jsonify({
            'err': "Another role with this name has already existed",
            'status': "FAIL"
        }), 201
    except:
        return jsonify({
            'err': "Unexpected error occurred while updating this role",
            'status': "FAIL"
        }), 500

    return jsonify({
        'status': "OK"
    })
