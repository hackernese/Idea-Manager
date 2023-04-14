import os
from app import app, mail
from . import login_required, send_mail
from db import Submission, db, Idea, User, Reaction, Comments, Views
from flask import jsonify, request, send_file
from werkzeug.utils import secure_filename
from sqlalchemy.exc import IntegrityError
from setting import basedir
from sqlalchemy import desc, func, asc
import math


@app.route("/api/idea/<idea_id>/set/doc", methods=["POST"])
@login_required()
def set_doc_for_idea(idea_id):
    # check if idea existed
    idea = Idea.query.get(idea_id)
    if idea:
        # check user who wants to upload file and user that added this idea is the same?
        if idea.user_id == request.session.user.id:
            data = request.files
            # Save the file to disk and get the filename
            if data:
                file = data['doc_file']
                file_name = f"Idea-{idea.id}.{secure_filename(file.filename)}"
                file.save(os.path.join(basedir, "uploads",
                          file_name))
                # add filename into DB
                idea.doc_file = file_name
                db.session.commit()
                return jsonify({
                    'status': 'OK',
                    'msg': 'File Uploaded'
                })
            else:
                return jsonify({
                    'status': 'FAIL',
                    'err': 'No Data Found'
                })
        else:
            return jsonify({
                'status': 'FAIL',
                'err': 'Unauthorized'
            })
    else:
        return jsonify({
            'status': 'FAIL',
            'err': 'No Idea Found'
        })


@app.route('/api/submission/<submission_id>/idea/add', methods=['POST'])
@login_required()
def add_idea(submission_id):
    # Check if the submission existed
    submission = Submission.query.get(submission_id)
    if submission:
        # get current user
        user = request.session.user

        # Parse the request data
        data = request.json

        if 'title' in data and 'brief' in data and 'content' in data and 'is_anonymous' in data and 'category_id' in data:
            title = data['title'].strip()
            brief = data['brief'].strip()
            content = data['content'].strip()
            is_anonymous = data['is_anonymous']  # False | True
            category_id = data['category_id']

        else:
            return jsonify({
                'status': 'FAIL',
                'err': 'Missing Parameter'
            })

        # Create the new idea
        try:
            idea = Idea(
                user_id=user.id,
                is_anonymous=is_anonymous,
                title=title,
                brief=brief,
                content=content,
                category_id=category_id,
                sub_id=submission.id
            )

            # Save the new idea to the database
            db.session.add(idea)
            db.session.flush()

            id_ = idea.id

            db.session.commit()

            return jsonify({
                'status': 'OK',
                'msg': {
                    "id": id_
                }
            })

        except IntegrityError:
            db.session.rollback()
            return ({
                'status': 'FAIL',
                'err': 'Failed to Add Idea'
            })
    else:
        return jsonify({
            'status': 'FAIL',
            'err': 'No Submission Found'
        })


@app.route('/api/submission/<submission_id>/idea/list', methods=['GET', 'POST'])
@login_required()
def list_all_ideas(submission_id):
    # check if submission existed?

    data = request.get_json()

    if "p" not in data:
        return jsonify({
            'status': "FAIL",
            'msg': "Missing page number."
        })

    try:
        page = int(data['p'])
    except:
        return jsonify({
            'status': "FAIL",
            'msg': "Invalid page number."
        })

    submission = Submission.query.get(submission_id)

    filter = None

    if 'filter' in data:
        filter = data['filter']

    if submission:
        # get ideas from submission

        total_page = math.ceil(submission.reference.count() / 5)

        query = submission.reference.add_columns(None).order_by(
            Idea.created_on.desc())

        if filter == 0:
            # Most popular
            query = submission.reference \
                .outerjoin(Reaction, Idea.id == Reaction.idea_id) \
                .add_columns(Idea.id, func.sum(Reaction.react).label('react_count')) \
                .group_by(Idea.id) \
                .order_by(desc('react_count'))

        elif filter == 1:
            # LEaset popular
            query = submission.reference \
                .outerjoin(Reaction, Idea.id == Reaction.idea_id) \
                .add_columns(Idea.id, func.sum(Reaction.react).label('react_count')) \
                .group_by(Idea.id) \
                .order_by(asc('react_count'))
        elif filter == 2:
            # Most viewed
            query = submission.reference \
                .outerjoin(Views, Idea.id == Views.idea_id) \
                .add_columns(Idea.id, func.count(Views.idea_id).label('view_count')) \
                .group_by(Idea.id) \
                .order_by(desc('view_count'))

        ideas = query.offset(page*5).limit(5).all()

        if ideas:
            result = []
            for idea in ideas:

                idea = idea[0]
                like = idea.react_ref.filter_by(react=True)
                dislike = idea.react_ref.filter_by(react=False)

                reactobj = idea.react_ref.filter_by(
                    user_id=request.session.user.id).first()

                idea_dict = {
                    'like': like.count(),
                    'dislike': dislike.count(),
                    # True = Like, False = Dislike, None = not yet
                    'react': (None if not reactobj else reactobj.react),
                    'views': idea.view_ref.count(),
                    'id': idea.id,
                    'title': idea.title,
                    'brief': idea.brief,
                    'content': idea.content,
                    'doc_file': idea.doc_file,
                    'category_id': idea.category_id,
                    'is_anonymous': idea.is_anonymous
                }
                if idea.is_anonymous == False:
                    user = User.query.get(idea.user_id)
                    if user is not None:
                        idea_dict['user_id'] = user.id
                        idea_dict['user_name'] = user.username
                else:
                    idea_dict['user_id'] = None
                    idea_dict['user_name'] = 'Anonymous'

                result.append(idea_dict)

            return jsonify({
                'status': 'OK',
                'msg': {
                    "data": result,
                    "page": total_page
                }
            })
        else:
            return jsonify({
                'status': 'FAIL',
                'err': 'No Idea Found in Submission'
            })
    else:
        return ({
            'status': 'FAIL',
            'err': 'No Submission Found'
        })


@ app.route('/api/idea/delete/<idea_id>', methods=['DELETE'])
@ login_required(role_allow=['manager', 'administrator'])
def delete_idea(idea_id):
    # check if idea existed?
    idea = Idea.query.get(idea_id)
    if idea:
        # delete idea from DB
        try:
            db.session.delete(idea)
            db.session.commit()
            return jsonify({
                'status': 'OK',
                'msg': 'Idea Deleted'
            })
        except:
            db.session.rollback()
            return jsonify({
                'status': 'FAIL',
                'err': 'Could Not Delete Idea'
            })
    else:
        return jsonify({
            'status': 'FAIL',
            'err': 'No Idea Found'
        })


@ app.route('/api/idea/get/<idea_id>', methods=['GET', 'POST'])
@ login_required()
def get_idea_info(idea_id):
    # check if Idea existed?
    idea = Idea.query.get(idea_id)
    if idea:
        # check if user who uploaded this idea is anonymous or not?
        user = User.query.get(idea.user_id)

        data = {
            'id': idea.id,
            'is_anonymous': idea.is_anonymous,
            'title': idea.title,
            'brief': idea.brief,
            'content': idea.content,
            'doc_file': idea.doc_file,
            'category': idea.category.name,
            'submission': idea.submission.name,
            'user_id': None if idea.is_anonymous else user.id,
            'user_name': "Anonymous" if idea.is_anonymous else user.username
        }

        # CHecking if this user has viewed this idea in the past or not
        ret = db.session.query(Views).filter_by(
            user_id=request.session.user.id).filter_by(idea_id=idea.id).first()
        if not ret:
            db.session.add(
                Views(user_id=request.session.user.id, idea_id=idea.id))
            db.session.commit()

        # Update the current view
        data['views'] = idea.view_ref.count()

        return jsonify({
            'status': "OK",
            'data': data
        })

    return jsonify({
        'status': 'FAIL',
        'err': 'No Idea Found'
    })


@ app.route('/api/idea/like/<idea_id>', methods=['POST'])
@ login_required()
def like_idea(idea_id):
    idea = Idea.query.get(idea_id)
    if idea:
        # check if user has reacted this idea or has not?
        reacted = request.session.user.reaction_ref.filter_by(
            idea_id=idea_id).first()

        if reacted:
            reacted.react = True
            db.session.commit()
        else:
            # get user id
            user_id = request.session.user.id
            new_react = Reaction(
                user_id=user_id, idea_id=idea_id, react=True)
            db.session.add(new_react)
            db.session.commit()

        return jsonify({
            'status': 'OK',
            'msg': 'Like Idea Successfully'
        })

    else:
        return jsonify({
            'status': 'FAIL',
            'err': 'No Idea Found'
        })


@ app.route('/api/idea/dislike/<idea_id>', methods=['POST'])
@ login_required()
def dislike_idea(idea_id):
    idea = Idea.query.get(idea_id)
    if idea:
        # check if user has reacted this idea or has not?
        reacted = request.session.user.reaction_ref.filter_by(
            idea_id=idea_id).first()
        if reacted:
            reacted.react = False
            db.session.commit()
        else:
            # get user id
            user_id = request.session.user.id
            new_react = Reaction(
                user_id=user_id, idea_id=idea_id, react=False)
            db.session.add(new_react)
            db.session.commit()

        return jsonify({
            'status': 'OK',
            'msg': 'Dislike Idea Successfully'
        })
    else:
        return jsonify({
            'status': 'FAIL',
            'err': 'No Idea Found'
        })


@ app.route('/api/idea/comment/<idea_id>', methods=['POST'])
@ login_required()
def comment_on_idea(idea_id):
    idea = Idea.query.get(idea_id)
    if idea:
        # get current user
        current_user = request.session.user
        # get data from user
        data = request.json
        if 'comment' in data and 'is_anonymous' in data:
            comment = data['comment'].strip()
            is_anonymous = data['is_anonymous']  # True|False
            new_comment = Comments(
                user_id=current_user.id, idea_id=idea_id, comment=comment, is_anonymous=is_anonymous)
            # add comment to db
            try:
                db.session.add(new_comment)
                db.session.commit()

                # send email to idea's owner
                send_mail(
                    'Your Idea Had New Comment!',
                    f"Your \"{idea.title}\" Idea Has Been Commented by {current_user.username} ",
                    [idea.user.email]
                )

                return jsonify({
                    'status': 'OK',
                    'msg': 'Add comment successfully'
                })

            except IntegrityError:
                db.session.rollback()
                return jsonify({
                    'status': 'FAIL',
                    'err': 'Could Not Add Comment'
                })
        else:
            return jsonify({
                'status': 'FAIL',
                'err': 'Missing Parameter'
            })
    else:
        return jsonify({
            'status': 'FAIL',
            'err': 'No Idea Found'
        })


@ app.route('/api/idea/<idea_id>/comment/list', methods=['GET', 'POST'])
@ login_required()
def list_all_comment(idea_id):
    idea = Idea.query.get(idea_id)
    if idea:
        # get comments from idea
        comments = idea.comment_ref.order_by(Comments.created_on.desc())

        if comments:
            result = []
            # append each comment to dictionary
            for comment in comments:
                comment_dict = {
                    'id': comment.id,
                    'idea_id': idea.id,
                    'comment': comment.comment,
                    'is_anonymous': comment.is_anonymous,
                    'created': str(comment.created_on)
                }
                if comment.is_anonymous == False:
                    user = User.query.get(comment.user_id)
                    if user is not None:
                        comment_dict['user_id'] = user.id
                        comment_dict['user_name'] = user.username
                else:
                    comment_dict['user_id'] = None
                    comment_dict['user_name'] = 'Anonymous'

                result.append(comment_dict)

            return jsonify({
                'status': 'OK',
                'msg': result
            })
        else:
            return jsonify({
                'status': 'FAIL',
                'err': 'No Comment Found in Idea'
            })


@ app.route('/api/comment/<comment_id>/delete', methods=['DELETE'])
@ login_required()
def delete_comment(comment_id):
    comment = Comments.query.get(comment_id)
    if comment:
        # get current user id
        user_id = request.session.user.id
        # check authorization of user
        if user_id == comment.user_id:
            try:
                # delete database
                db.session.delete(comment)
                db.session.commit()
                return jsonify({
                    'status': 'OK',
                    'msg': 'Comment Deleted'
                })
            except:
                db.session.rollback()
                return jsonify({
                    'status': 'FAIL',
                    'err': 'Could Not Delete Comment'
                })
        else:
            return jsonify({
                'status': 'FAIL',
                'err': 'Unauthorized For Deleting Comment'
            })
    else:
        return jsonify({
            'status': 'FAIL',
            'err': 'No Comment Found'
        })


@ app.route('/api/idea/doc/<idea_id>', methods=['GET', 'POST'])
@ login_required()
def download_idea_doc(idea_id):
    idea = Idea.query.get(idea_id)
    if idea:
        path = f"{basedir}/uploads/{idea.doc_file}"
        return send_file(path, as_attachment=True)
    else:
        return jsonify({
            'status': 'FAIL',
            'err': 'No Idea Found'
        })
