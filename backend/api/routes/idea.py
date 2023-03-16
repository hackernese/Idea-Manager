import os
from app import app
from . import login_required
from db import Submission, db, Idea, User, Reaction, Comments
from flask import jsonify, request, send_file
from werkzeug.utils import secure_filename
from sqlalchemy.exc import IntegrityError
from setting import basedir

@app.route("/api/idea/<idea_id>/set/doc", methods=["POST"])
@login_required()
def set_doc_for_idea(idea_id):
    #check if idea existed
    idea = Idea.query.get(idea_id)
    if idea:
        #check user who wants to upload file and user that added this idea is the same?
        if idea.user_id == request.session.user.id:
            data = request.files
            # Save the file to disk and get the filename
            if data:
                file = data['doc_file']
                file_name = secure_filename(file.filename)
                file.save(f"{basedir}/uploads/{file_name}")
                #add filename into DB
                idea.doc_file = file_name
                db.session.commit()
                return jsonify({
                    'status':'OK',
                    'msg':'File Uploaded'
                })
            else:
                return jsonify({
                    'status':'FAIL',
                    'err':'No Data Found'
                })
        else:
            return jsonify({
                'status':'FAIL',
                'err':'Unauthorized'
            })
    else:
        return jsonify({
            'status':'FAIL',
            'err':'No Idea Found'
        })

@app.route('/api/submission/<submission_id>/idea/add', methods=['POST'])
@login_required()
def add_idea(submission_id):
    # Check if the submission existed
    submission = Submission.query.get(submission_id)
    if submission:
        #get current user 
        user = request.session.user

        # Parse the request data
        data = request.json

        if 'title' in data and 'brief' in data and 'content' in data and 'is_anonymous' in data and 'category_id' in data:
            title = data['title'].strip()
            brief = data['brief'].strip()
            content = data['content'].strip()
            is_anonymous = data['is_anonymous'] # False | True
            category_id = data['category_id']
        
        else:
            return jsonify({
                'status':'FAIL',
                'err':'Missing Parameter'
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
            db.session.commit()

            return jsonify({
                'status':'OK',
                'msg':'Idea Added Successfully'
            })

        except IntegrityError:
            db.session.rollback()
            return({
                'status':'FAIL',
                'err':'Failed to Add Idea'
            })
    else:
        return jsonify({
            'status':'FAIL',
            'err':'No Submission Found'
        })


@app.route('/api/submission/<submission_id>/idea/list', methods=['GET','POST'])
@login_required()
def list_all_ideas(submission_id):
    #check if submission existed?
    submission = Submission.query.get(submission_id)
    if submission:
        #get ideas from submission
        ideas = submission.reference
        if ideas:
            result = []
            for idea in ideas:
                idea_dict = {
                    'id': idea.id,
                    'title': idea.title,
                    'brief': idea.brief,
                    'content': idea.content,
                    'doc_file': idea.doc_file,
                    'category_id': idea.category_id,
                    'is_anonymous': idea.is_anonymous
                }
                if idea.is_anonymous ==  False:
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
                'msg':result
            })
        else:
            return jsonify({
                'status':'FAIL',
                'err':'No Idea Found in Submission'
            })
    else:
        return({
            'status':'FAIL',
            'err':'No Submission Found'
        })

@app.route('/api/idea/delete/<idea_id>', methods=['DELETE'])
@login_required(role_allow = ['manager', 'administrator'])
def delete_idea(idea_id):
    #check if idea existed?
    idea = Idea.query.get(idea_id)
    if idea:
        #delete idea from DB
        try:
            db.session.delete(idea)
            db.session.commit()
            return jsonify({
                'status':'OK',
                'msg':'Idea Deleted'
            })
        except:
            db.session.rollback()
            return jsonify({
                'status':'FAIL',
                'err':'Could Not Delete Idea'
            })
    else:
        return jsonify({
            'status':'FAIL',
            'err':'No Idea Found'
        })

@app.route('/api/idea/get/<idea_id>', methods=['GET','POST'])
@login_required()
def get_idea_info(idea_id):
    #check if Idea existed?
    idea = Idea.query.get(idea_id)
    if idea:
        #check if user who uploaded this idea is anonymous or not?
        if idea.is_anonymous ==  False:
            user = User.query.get(idea.user_id)
            if user is not None:
                return jsonify({
                    'id': idea.id,
                    'user_id': idea.user_id,
                    'is_anonymous': idea.is_anonymous,
                    'title': idea.title,
                    'brief': idea.brief,
                    'content': idea.content,
                    'doc_file': idea.doc_file,
                    'category_id': idea.category_id,
                    'sub_id': idea.sub_id,
                    'user_id': user.id,
                    'user_name': user.username
                })

        else:
                return jsonify({
                    'id': idea.id,
                    'user_id': idea.user_id,
                    'is_anonymous': idea.is_anonymous,
                    'title': idea.title,
                    'brief': idea.brief,
                    'content': idea.content,
                    'doc_file': idea.doc_file,
                    'category_id': idea.category_id,
                    'sub_id': idea.sub_id,
                    'user_id': None,
                    'user_name': 'Anonymous'
                })   

    else:
        return jsonify({
            'status':'FAIL',
            'err':'No Idea Found'
        })

@app.route('/api/idea/like/<idea_id>', methods=['POST'])
@login_required()
def like_idea(idea_id):
    idea = Idea.query.get(idea_id)
    if idea:
        #check if user has reacted this idea or has not?
        reacted = request.session.user.reaction_ref.filter_by(idea_id=idea_id).first()
        if reacted:
            reacted.like = True
            reacted.dislike = False
            db.session.commit()
        else:
            #get user id
            user_id = request.session.user.id
            new_react = Reaction(user_id = user_id, idea_id = idea_id, like = True, dislike = False)
            db.session.add(new_react)
            db.session.commit()
            
        return jsonify({
            'status':'OK',
            'msg':'Like Idea Successfully'
        })
    
    else:
        return jsonify({
            'status':'FAIL',
            'err':'No Idea Found'
        })
        

@app.route('/api/idea/dislike/<idea_id>', methods=['POST'])
@login_required()
def dislike_idea(idea_id):
    idea = Idea.query.get(idea_id)
    if idea:
        #check if user has reacted this idea or has not?
        reacted = request.session.user.reaction_ref.filter_by(idea_id=idea_id).first()
        if reacted:
            reacted.like = False
            reacted.dislike = True
            db.session.commit()
        else:
            #get user id
            user_id = request.session.user.id
            new_react = Reaction(user_id = user_id, idea_id = idea_id, like = False, dislike = True)
            db.session.add(new_react)
            db.session.commit()
        
        return jsonify({
            'status':'OK',
            'msg':'Dislike Idea Successfully'
        })
    else:
        return jsonify({
        'status':'FAIL',
        'err':'No Idea Found'
    })

@app.route('/api/idea/comment/<idea_id>', methods=['POST'])
@login_required()
def comment_on_idea(idea_id):
    idea = Idea.query.get(idea_id)
    if idea:
        #get current user id
        user_id = request.session.user.id
        #get data from user
        data = request.json
        if 'comment' in data and 'is_anonymous' in data:
            comment = data['comment'].strip()
            is_anonymous = data['is_anonymous'] #True|False
            new_comment = Comments(user_id = user_id, idea_id = idea_id, comment = comment, is_anonymous = is_anonymous)
            #add comment to db
            try:
                db.session.add(new_comment)
                db.session.commit()
                return jsonify({
                    'status':'OK',
                    'msg':'Add comment successfully'
                })
                
            except IntegrityError:
                db.session.rollback()
                return jsonify({
                    'status':'FAIL',
                    'err':'Could Not Add Comment'
                })
        else: 
            return jsonify({
                'status':'FAIL',
                'err':'Missing Parameter'
            })
    else:
        return jsonify({
            'status':'FAIL',
            'err':'No Idea Found'
        })
        
@app.route('/api/idea/<idea_id>/comment/list', methods = ['GET', 'POST'])
@login_required()
def list_all_comment(idea_id):
    idea = Idea.query.get(idea_id)
    if idea:
        #get comments from idea
        comments = idea.comment_ref
        if comments:
            result = []
            #append each comment to dictionary
            for comment in comments:
                comment_dict = {
                    'id': comment.id,
                    'idea_id': idea.id,
                    'comment': comment.comment,
                    'is_anonymous': comment.is_anonymous
                }
                if comment.is_anonymous ==  False:
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
                'msg':result
            })
        else:
            return jsonify({
                'status':'FAIL',
                'err':'No Comment Found in Idea'
            })
            
@app.route('/api/comment/<comment_id>/delete', methods = ['DELETE'])
@login_required()
def delete_comment(comment_id):
    comment = Comments.query.get(comment_id)
    if comment:
        #get current user id
        user_id = request.session.user.id
        #check authorization of user
        if user_id == comment.user_id:
            try:
                #delete database
                db.session.delete(comment)
                db.session.commit()
                return jsonify({
                    'status':'OK',
                    'msg':'Comment Deleted'
                })
            except: 
                db.session.rollback()
                return jsonify({
                    'status':'FAIL',
                    'err':'Could Not Delete Comment'
                })
        else:
            return jsonify({
                'status':'FAIL',
                'err':'Unauthorized For Deleting Comment'
            })
    else:
        return jsonify({
            'status':'FAIL',
            'err':'No Comment Found'
        })
        

@app.route('/api/idea/doc/<idea_id>', methods=['GET', 'POST'])
@login_required()
def download_idea_doc(idea_id):
    idea = Idea.query.get(idea_id)
    if idea:
        path = f"{basedir}/uploads/{idea.doc_file}"
        return send_file(path, as_attachment=True)
    else:
        return jsonify({
            'status':'FAIL',
            'err':'No Idea Found'
        })








