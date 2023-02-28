
from app import app
from . import login_required
from db import Submission, db, Idea


@app.route('/api/submission/<submission_id>/idea/add', methods=['POST'])
# @login_required
def add_idea(submission_id):
    return ""

@app.route('/api/submission/<submission_id>/idea/list', methods=['GET','POST'])
# @login_required
def list_all_ideas(submission_id):
    return ""

@app.route('/api/idea/delete/<idea_id>', methods=['DELETE'])
# @login_required
def delete_idea(idea_id):
    return ""

@app.route('/api/idea/get/<idea_id>', methods=['GET','POST'])
# @login_required
def get_idea_info(idea_id):
    return ""

@app.route('/api/idea/like/<idea_id>', methods=['POST'])
# @login_required
def like_idea( idea_id):
    return ""

@app.route('/api/idea/dislike/<idea_id>', methods=['POST'])
# @login_required
def dislike_idea( idea_id):
    return ""

@app.route('/api/idea/comment/<idea_id>', methods=['POST'])
# @login_required
def comment_on_idea(idea_id):
    return ""

@app.route('/api/idea/doc/<idea_id>', methods=['GET', "POST"])
# @login_required
def download_idea_doc(idea_id):
    return ""








