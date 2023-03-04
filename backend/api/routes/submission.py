from app import app
from db import Submission, db
from datetime import datetime
from . import login_required
from flask import jsonify, request
from sqlalchemy.exc import IntegrityError


@app.route('/api/submission/add', methods=['POST'])
@login_required(role_allow=['manager','administrator'])
def add_submission():
    data = request.json
    #validate if submission receive enough data or not?
    if data and ('name' in data):
        if 'deadline1' in data:
            if 'deadline2' in data:
                name = data['name'].strip()
                deadline1 = data['deadline1']
                deadline2 = data['deadline2']
            else: 
                return jsonify({
                    'status':'FAIL',
                    'err':'Missing Deadline2'
            })
        else: 
            return jsonify({
                    'status':'FAIL',
                    'err':'Missing Deadline1'
            })
    else: 
        return jsonify({
                    'status':'FAIL',
                    'err':'Missing Name'
            })
        
    #add submission into database 
    try:
        #convert deadline1 & deadline2 into DateTime
        new_submission = Submission(name = name, deadline1 = datetime.fromisoformat(deadline1), deadline2 = datetime.fromisoformat(deadline2))
        db.session.add(new_submission)
        db.session.commit()
        return jsonify({
            'status':'OK',
            'msg':'Add Successfully'
        })
    
    except IntegrityError:
        db.session.rollback()
        return jsonify({
            'status':'FAIL',
            'err':'Could Not Add Submission'
        })



@app.route('/api/submission/delete/<submission_id>', methods=['DELETE'])
@login_required(role_allow=['manager','administrator'])
def delete_submission(submission_id):
    #check if submission existed?
    submission = Submission.query.get(submission_id)
    if submission:
        #delete submission
        try:
            db.session.delete(submission)
            db.session.commit()
            return jsonify({
                'status':'OK',
                'msg':'Submission Deleted'
            })
        except:
            db.session.rollback()
            return jsonify({
                'status':'FAIL',
                'err':'Could Not Delete Submission'
            })
    else:
        return jsonify({
            'status':'FAIL',
            'err':'No Submission Found'
        })


@app.route('/api/submission/list', methods=['GET','POST'])
@login_required()
def list_all_submissions():
    #get all submissions
    submissions = Submission.query.all()
    result = []
    #add each submission to list
    for submission in submissions:
        submissions_data = {'id': submission.id, 'name': submission.name, 'deadline1': submission.deadline1,
                             'deadline2': submission.deadline2, 'created_on': submission.created_on}
        result.append(submissions_data)
    return jsonify({
        'status':'OK',
        'msg': result
    })


@app.route('/api/submission/get/<submission_id>', methods=['GET','POST'])
@login_required()
def get_submission_info(submission_id):
    #check if submission existed?
    submission = Submission.query.get(submission_id)
    if submission:
        return jsonify({
            'id': submission.id,
            'name': submission.name,
            'deadline1': submission.deadline1,
            'deadline2': submission.deadline2,
            'created_on': submission.created_on
        })
    else:
        return jsonify({
            'status':"FAIL",
            'err':'No Submission Found'
        })

@app.route('/api/submission/update/<submission_id>', methods=['POST'])
@login_required(role_allow=['manager','administrator'])
def update_submission_info(submission_id):
    submission = Submission.query.get(submission_id)
    data = request.json
    #check if submission and data existed?
    if submission:
        if data:
            #update submission
            try:
                if 'name' in data:
                    submission.name = data['name'].strip()
                if 'deadline1' in data:
                    submission.deadline1 = datetime.fromisoformat(data['deadline1'])
                if 'deadline2' in data:
                    submission.deadline2 = datetime.fromisoformat(data['deadline2'])
                        
                db.session.commit()
                return jsonify({
                    'status':'OK',
                    'message': 'Submission updated successfully'
                })
            
            except IntegrityError:
                db.session.rollback()
                return jsonify({
                    'status':'FAIL',
                    'err':'Failed to Update Submission'
                })
        else: 
            return jsonify({
                'status':'FAIL',
                'err':"No Data for Updating"
        })
    else:
        return jsonify({
            'status':'FAIL',
            'err':'No Submission Found'
        })

    

