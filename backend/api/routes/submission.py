import zipfile
import os
from app import app
from db import Submission, db
from datetime import datetime
from . import login_required
from flask import jsonify, request, send_file
from sqlalchemy.exc import IntegrityError
from setting import basedir
from dateutil import parser as TimeParser
import csv


@app.route('/api/submission/add', methods=['POST'])
@login_required(role_allow=['manager', 'administrator'])
def add_submission():
    data = request.json
    # validate if submission receive enough data or not?
    if data and ('name' in data):
        if 'deadline1' in data:
            if 'deadline2' in data:
                name = data['name'].strip()
                deadline1 = data['deadline1']
                deadline2 = data['deadline2']
            else:
                return jsonify({
                    'status': 'FAIL',
                    'err': 'Missing Deadline2'
                })
        else:
            return jsonify({
                'status': 'FAIL',
                'err': 'Missing Deadline1'
            })
    else:
        return jsonify({
            'status': 'FAIL',
            'err': 'Missing Name'
        })

    # add submission into database
    try:
        # convert deadline1 & deadline2 into DateTime

        # print()

        new_submission = Submission(name=name, deadline1=TimeParser.parse(
            deadline1), deadline2=TimeParser.parse(deadline2))
        db.session.add(new_submission)
        db.session.commit()
        return jsonify({
            'status': 'OK',
            'msg': 'Add Successfully'
        })

    except IntegrityError:
        db.session.rollback()
        return jsonify({
            'status': 'FAIL',
            'err': 'Could Not Add Submission'
        })


@app.route('/api/submission/delete/<submission_id>', methods=['DELETE'])
@login_required(role_allow=['manager', 'administrator'])
def delete_submission(submission_id):
    # check if submission existed?
    submission = Submission.query.get(submission_id)
    print(submission, submission_id)
    if submission:
        # delete submission
        try:
            db.session.delete(submission)
            db.session.commit()
            return jsonify({
                'status': 'OK',
                'msg': 'Submission Deleted'
            })
        except:
            db.session.rollback()
            return jsonify({
                'status': 'FAIL',
                'err': 'Could Not Delete Submission'
            })
    else:
        return jsonify({
            'status': 'FAIL',
            'err': 'No Submission Found'
        })


@app.route('/api/submission/list', methods=['GET', 'POST'])
@login_required()
def list_all_submissions():
    # get all submissions
    submissions = Submission.query.all()
    result = []
    # add each submission to list
    for submission in submissions:
        current = datetime.now()
        submissions_data = {'id': submission.id, 'deadline1_end': current > submission.deadline1, 'deadline2_end': current > submission.deadline2, 'name': submission.name, 'deadline1': submission.deadline1,
                            'deadline2': submission.deadline2, 'created_on': submission.created_on}
        result.append(submissions_data)
    return jsonify({
        'status': 'OK',
        'msg': result
    })


@app.route('/api/submission/get/<submission_id>', methods=['GET', 'POST'])
@login_required()
def get_submission_info(submission_id):
    # check if submission existed?
    submission = Submission.query.get(submission_id)
    if submission:
        current = datetime.now()
        return jsonify({
            'id': submission.id,
            'name': submission.name,
            'deadline1_end': current > submission.deadline1,
            'deadline2_end': current > submission.deadline2,
            'deadline1': submission.deadline1,
            'deadline2': submission.deadline2,
            'created_on': submission.created_on
        })
    else:
        return jsonify({
            'status': "FAIL",
            'err': 'No Submission Found'
        })


@app.route('/api/submission/update/<submission_id>', methods=['POST'])
@login_required(role_allow=['manager', 'administrator'])
def update_submission_info(submission_id):
    submission = Submission.query.get(submission_id)
    data = request.json
    # check if submission and data existed?
    if submission:
        if data:
            # update submission
            try:
                if 'name' in data:
                    submission.name = data['name'].strip()
                if 'deadline1' in data:
                    submission.deadline1 = TimeParser.parse(
                        data['deadline1'])
                if 'deadline2' in data:
                    submission.deadline2 = TimeParser.parse(
                        data['deadline2'])

                db.session.commit()
                return jsonify({
                    'status': 'OK',
                    'message': 'Submission updated successfully'
                })

            except IntegrityError:
                db.session.rollback()
                return jsonify({
                    'status': 'FAIL',
                    'err': 'Failed to Update Submission'
                })
        else:
            return jsonify({
                'status': 'FAIL',
                'err': "No Data for Updating"
            })
    else:
        return jsonify({
            'status': 'FAIL',
            'err': 'No Submission Found'
        })


@app.route('/api/submission/download_zip/<submission_id>', methods=['POST', 'GET'])
@login_required(role_allow=['manager'])
def download_zip(submission_id):
    submission = Submission.query.get(submission_id)
    file_paths = []
    if submission:
        # get all Ideas from sub
        ideas = submission.reference.all()
        if ideas:
            for idea in ideas:
                file_name = idea.doc_file
                if file_name:
                    file_paths.append(f"{basedir}/uploads/{file_name}")

            # check is any files in Ideas belong to this Submission
            if file_paths == []:
                return jsonify({
                    'status': 'FAIL',
                    'err': 'No File Found from Submission'
                })
            else:
                # Create a name for the ZIP file

                zip_file_name = os.path.join(
                    basedir, "temp",  f"Submission{submission.id}.zip")

                if os.path.isfile(zip_file_name):
                    os.remove(zip_file_name)

               # Create a new ZIP file and write the files to it
                with zipfile.ZipFile(zip_file_name, 'w') as zip:
                    for (index, file_path) in enumerate(file_paths):
                        zip.write(
                            file_path, f"Idea{index}/{os.path.basename(file_path)}")

                # Send the ZIP file as a response to the client
                return send_file(zip_file_name, as_attachment=True)
        else:
            return jsonify({
                'status': 'FAIL',
                'err': 'No Idea Found from Submission'
            })
    else:
        return jsonify({
            'status': 'FAIL',
            'err': 'No Submission Found'
        })


@app.route('/api/submission/download/csv/<submission_id>', methods=["POST", "GET"])
@login_required(role_allow=["manager"])
def download_csv_info(submission_id):

    submission = Submission.query.get(submission_id)
    if not submission:
        return jsonify({
            'status': "FAIL",
            'err': "Invalid submission"
        })

    path = os.path.join(basedir, 'temp', f"Submission-{submission_id}.csv")

    with open(path, "w", newline='') as proto:

        fieldnames = ["Vol.", "ID", "Title", "Content", "Filename",
                      "Total views", 'like', 'dislike', "Author"]
        writer = csv.DictWriter(proto, fieldnames=fieldnames)

        # Start by putting in the header first
        writer.writeheader()

        # Putting in data
        ideas = submission.reference.all()
        for (id_, i) in enumerate(ideas):

            if not i.doc_file:
                continue

            data = {
                'Vol.': id_,
                'ID': i.id,
                "Title": str(i.title),
                'Content': str(i.content),
                'Filename': os.path.basename(i.doc_file),
                'Author': str(i.user.username),
                'like': i.react_ref.filter_by(react=True).count(),
                'dislike': i.react_ref.filter_by(react=False).count(),
                'Total views': i.view_ref.count()
            }

            writer.writerow(data)

    return send_file(path, as_attachment=True)
