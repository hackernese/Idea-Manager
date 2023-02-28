from app import app
from flask import request, jsonify
from db import db, User, Sessions, RecoverAccountDB # Importing and initializing the database
from . import login_required, bad_request, unauthorized_req



@app.route("/api/auth/login", methods=["POST"])
def login():

    data = request.get_json()

    if "name" not in data or "passwd" not in data:

        # Checking if the request body contains password and username or not
        # if not, mark it as invalid
        return bad_request("Missing parameters")


    name = data['name']
    passwd = data['passwd']

    # Verifying the credentials below

    user = User.query.filter(User.username == name.strip()).first()

    if not user or  not user.check_password(passwd):

        # No such user name
        return bad_request("Invalid credentials")

    new_session = Sessions(user.id)
    db.session.add(new_session)
    db.session.commit()

    return jsonify({
        'status' : "OK",
        'token' : new_session.token
    })

@app.route('/api/auth/logout', methods=["POST"])
@login_required()
def logout():

    db.session.delete(request.session)
    db.session.commit()

    return {
        'status' : "OK"
    }
