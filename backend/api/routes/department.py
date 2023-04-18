from app import app
from db import db, Department
from . import login_required
from flask import request, jsonify
from sqlalchemy.exc import IntegrityError


@app.route('/api/department/add', methods=['POST'])
@login_required(role_allow=['manager', 'administrator'])
def add_department():
    # check if department's name is available?
    data = request.json
    if data and 'name' in data:
        name = data['name'].strip()
    else:
        return jsonify({
            'status': 'FAIL',
            'err': 'Missing Name'
        })

    # Add Department to DB
    try:
        new_department = Department(name=name)
        db.session.add(new_department)
        db.session.commit()
        return jsonify({
            'status': 'OK',
            'msg': 'Add Successfully'
        })
    except IntegrityError:
        db.session.rollback()
        return jsonify({
            'status': 'FAIL',
            'err': 'Failed to Add Department'
        })


@app.route('/api/department/delete/<department_id>', methods=['DELETE'])
@login_required(role_allow=['manager', 'administrator'])
def delete_department(department_id):
    # check if department existed?
    department = Department.query.get(department_id)
    if department:
        # delete in DB
        try:
            db.session.delete(department)
            db.session.commit()
            return jsonify({
                'status': 'OK',
                'msg': 'Department Deleted'
            })
        except:
            db.session.rollback()
            return jsonify({
                'status': 'FAIL',
                'err': 'Could not Delete Department'
            })
    else:
        return jsonify({
            'status': 'FAIL',
            'err': 'No Department Found'
        })


@app.route('/api/department/list', methods=['GET', 'POST'])
@login_required(role_allow=['manager', 'administrator'])
def list_all_department():
    departments = Department.query.all()
    result = []
    # append each department into list
    for department in departments:
        department_data = {
            'id': department.id, 'name': department.name, 'created_on': department.created_on}
        result.append(department_data)
    return jsonify({
        'status': 'OK',
        'msg': result
    })


@app.route('/api/department/get/<department_id>', methods=['GET', 'POST'])
@login_required(role_allow=['manager', 'administrator'])
def get_department_info(department_id):
    # check if department existed or not?
    department = Department.query.get(department_id)
    if department:
        return jsonify({
            'id': department.id,
            'name': department.name,
            'created_on': department.created_on
        })
    else:
        return jsonify({
            'status': 'FAIL',
            'err': 'No Department Found'
        })


@app.route('/api/department/update/<department_id>', methods=['POST'])
@login_required(role_allow=['manager', 'administrator'])
def update_department_info(department_id):
    department = Department.query.get(department_id)
    data = request.json
    # check if department and data existed?
    if department:
        if data:
            if 'name' in data:
                new_name = data['name'].strip()

            # update department
            try:
                department.name = new_name
                db.session.commit()
                return jsonify({'status': "OK", 'message': 'Department Updated Successfully'})

            except IntegrityError:
                db.session.rollback()
                return jsonify({
                    'status': 'FAIL',
                    'err': 'Failed to Update Department'
                })
        else:
            return jsonify({
                'status': 'FAIL',
                'err': "No Data for Updating"
            })
    else:
        return jsonify({
            'status': 'FAIL',
            'err': 'No Department Found'
        })
