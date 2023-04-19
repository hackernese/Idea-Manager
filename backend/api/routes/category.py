from app import app
# import db
from db import Category, db
from flask import request, jsonify
from . import login_required
from sqlalchemy.exc import IntegrityError


@app.route('/api/category/add', methods=['POST'])
@login_required(role_allow=['manager', 'administrator'])
def add_category():
    # check if name is available?
    data = request.json
    if data and 'name' in data:
        new_name = data['name'].strip()
    else:
        return jsonify({
            'status': 'FAIL',
            'err': 'Missing Name'
        })
    # Add to database
    try:
        new_category = Category(name=new_name)
        db.session.add(new_category)
        db.session.commit()
        return jsonify({
            'status': 'OK',
            'msg': 'Add Successfully'
        })
    except IntegrityError:
        db.session.rollback()
        return jsonify({
            'status': 'FAIL',
            'err': 'Failed to add specified category'
        })


@app.route('/api/category/delete/<category_id>', methods=['DELETE'])
@login_required(role_allow=['manager', 'administrator'])
def delete_category(category_id):
    # check if category_id exist?
    category = Category.query.get(category_id)
    if category:
        # delete category
        try:
            db.session.delete(category)
            db.session.commit()
            return jsonify({
                'status': 'OK',
                'msg': 'Category Deleted'
            })
        except:
            db.session.rollback()
            return jsonify({
                'status': 'FAIL',
                'err': 'Could Not Delete Category'
            })
    else:
        return jsonify({
            'status': 'FAIL',
            'err': 'Category not found'
        })


@app.route('/api/category/list', methods=['POST'])
@login_required()
def list_all_category():
    # get all category
    categories = Category.query.all()
    result = []
    # Add categories to list
    for category in categories:
        category_data = {'id': category.id, 'name': category.name,
                         'created_on': category.created_on}
        result.append(category_data)
    return jsonify({
        'status': 'OK',
        'msg': result
    })


@app.route('/api/category/get/<category_id>', methods=['POST'])
@login_required()
def get_category_info(category_id):
    # check if category existed?
    category = Category.query.get(category_id)
    result = []
    if category:
        # Add category to list
        result.append({'id': category.id, 'name': category.name,
                      'created_on': category.created_on})
        return jsonify({
            'status': 'OK',
            'msg': result
        })
    else:
        return jsonify({
            'status': "FAIL",
            'err': 'No Category Found'
        })


@app.route('/api/category/update/<category_id>', methods=['POST'])
@login_required(role_allow=['manager', 'administrator'])
def update_category_info(category_id):
    # check if category existed?
    category = Category.query.get(category_id)
    data = request.json
    if category:
        # check data and update category_name
        if data and ("name" in data):
            new_name = data['name'].strip()
        else:
            return jsonify({
                'status': 'FAIL',
                'err': 'No Data for Updating'
            })

        # Update Category
        try:
            category.name = new_name
            db.session.commit()
            return jsonify({
                'status': 'OK',
                'msg': 'Category Updated'
            })
        except IntegrityError:
            db.session.rollback()
            return jsonify({
                'status': 'FAIL',
                'err': 'Failed to Update Category Name'
            })

    else:
        return jsonify({
            'status': 'FAIL',
            'err': 'No Category Found'
        })
