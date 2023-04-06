from app import app, mail
from flask import request, jsonify, render_template
from db import db, User, Sessions, RecoverAccountDB, Logins # Importing and initializing the database
from . import login_required, bad_request, unauthorized_req
from flask_mail import Message
from datetime import datetime
import requests, json


@app.route("/api/auth/whoami", methods=["POST"])
@login_required()
def whoami():

    user = request.session.user

    return jsonify({
        'status' : "OK",
        'data' :  {
            'id' : user.id,
            'name' : user.username,
            'email' : user.email,
            'role' : user.userrole_ref.first().role.name,
            'phone' : user.phone,
            'birthday' : str(user.birthday),
            'gender' : user.gender,
            'address' : user.address,
            'lang' : user.language,
            'department' : user.department.name,
            'theme' : user.theme
        }
    })

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

    # Checking for login operation

    activity = {"ip" : request.remote_addr, "userid" : user.id}

    if 'browser' in data:
        activity['browser'] = data['browser']
    if 'os' in data:
        activity['os'] = data['os']

    lookupinfo = json.loads(requests.get(f"http://ipwho.is/{request.remote_addr}").text)
    if lookupinfo['success']:
        activity['location'] = lookupinfo['city']

    new_login = Logins(**activity)
    db.session.add(new_login)
    db.session.commit()

    return jsonify({
        'status' : "OK",
        'token' : new_session.token
    })

@app.route("/api/auth/login/get", methods=["POST"])
@login_required()
def get_login():

    data = request.get_json()

    if 'p' not in data:
        return bad_request("Missing field.")
    try:
        p = int(data['p'])
    except ValueError:
        return bad_request("Malformed data")

    ret = db.session.query(Logins).filter(Logins.userid==request.session.user.id).order_by(Logins.created_on.desc()).offset(p*10).limit(10).all()

    return jsonify({
        'status' : "OK",
        'data' : [
            {
                'id' : rec.id,
                'os' : rec.os,
                'l' : rec.location,
                'browser' : rec.browser,
                'ip' : rec.ip,
                'date' : rec.created_on
            } for rec in ret
        ]
    })

    breakpoint()

@app.route('/api/auth/logout', methods=["POST"])
@login_required()
def logout():
    if request.form.get("all"):
        # Checking if the user is requesting a logout-all operation
        # Deleting all sessions relating to this user

        for session in request.session.user.session_ref:
            db.session.delete(session)
    else:
        db.session.delete(request.session)

    db.session.commit()

    return {
        'status' : "OK"
    }

@app.route("/api/auth/reset", methods=["POST"])
def reset_password():

    data = request.get_json()

    if "email" not in data:
        return bad_request('Missing email address.')

    user = db.session.query(User).filter(User.email==data['email'].strip()).first()

    if not user:
        return jsonify({
            'status' : 'FAIL',
            'err' : "Email address doesn't exist."})

    # Creating new recovery record
    rec = RecoverAccountDB(user.id)
    db.session.add(rec)
    db.session.commit()

    # Grabbing the url and also the code
    recovery_code = rec.recover_code
    recovery_url = rec.craft_url()


    # Creating a message which send to the user email later
    msg = Message('Forgot your password ?',
        sender=app.config.get("MAIL_USERNAME"),
        recipients=[user.email])
    msg.html = render_template("forgot_password.html",
        code = " ".join(list(str(recovery_code))),
        url = recovery_url,
        username = user.username
    )
    mail.send(msg)

    return jsonify({
        'status' : "OK",
        'data' : {
            'uuid' : rec.unique_identifier
        }
    })

@app.route('/api/auth/resend', methods=["POST"])
def resend_code():


    data = request.get_json()

    if "uuid" not in data:
        return bad_request('Missing parameter.')

    rec = db.session.query(RecoverAccountDB).filter(RecoverAccountDB.unique_identifier==data['uuid'].strip()).first()

    if not rec:
        return jsonify({
            'status':"FAIL",
            'err':"Invalid recovery credentials"
        })

    if rec.expiry_time < datetime.now():
        db.session.delete(rec)
        db.session.commit()
        return jsonify({
            'status' : "FAIL",
            'err' : 'Expired.'
        })

    # Update the random 6-digits code
    rec.re_random_code()
    db.session.commit()
    # Grabbing data
    recovery_code = rec.recover_code
    recovery_url = rec.craft_url()
    user = rec.user

    # Creating a message which send to the user email later
    msg = Message('Forgot your password ?',
        sender=app.config.get("MAIL_USERNAME"),
        recipients=[user.email])
    msg.html = render_template("forgot_password.html",
        code = " ".join(list(str(recovery_code))),
        url = recovery_url,
        username = user.username
    )
    mail.send(msg)

    return jsonify({
        'status' : "OK"
    })

@app.route('/api/auth/reset/confirm', methods=["POST"])
def confirm_reset_passwd():

    data = request.get_json()

    is_code_present = 'code' in data
    is_urltoken_present = 'url_token' in data
    is_uuid_present = 'uuid' in data

    if not is_code_present and not is_urltoken_present:
        return bad_request('Missing parameter.')

    if ( is_code_present and not is_urltoken_present ) and not is_uuid_present:

        # Note to myself in the future : this means basically mean
        # "If ONLY the code exists but not the urltoken... and also if the uuid is gone, throw error"

        return bad_request('Missing code identifier.')


    query = db.session.query(RecoverAccountDB)
    rec = None

    if is_urltoken_present:
        rec = query.filter(RecoverAccountDB.url_token==data['url_token'].strip()).first()
    elif is_code_present:
        rec = query.filter(RecoverAccountDB.recover_code==data['code']).filter(RecoverAccountDB.unique_identifier==data['uuid'].strip()).first()

    if not rec:
        return jsonify({
            'status':"FAIL",
            'err':"Invalid recovery credentials"
        })

    if rec.expiry_time < datetime.now():
        db.session.delete(rec)
        db.session.commit()
        return jsonify({
            'status':"FAIL",
            'err':"Recovery token has expired"
        })

    return jsonify({
        'status' : "OK",
        'data' : {
            'token' : rec.url_token
        }
    })

@app.route("/api/auth/reset/new", methods=["POST"])
def reset_new_password():

    data = request.get_json()


    if 'passwd' not in data:
        return bad_request("Missing password field")
    if "token" not in data:
        return bad_request("Missing authentication token")

    rec = db.session.query(RecoverAccountDB).filter(RecoverAccountDB.url_token==data['token'].strip()).first()

    if not rec:
        return bad_request("Invalid recovery credential")
    if rec.expiry_time < datetime.now():
        db.session.delete(rec)
        db.session.commit()
        return jsonify({'status': "FAIL", 'err' : 'Recovery process has expired, please renew'})

    try:
        rec.user.set_new_password(data['passwd'])

        db.session.delete(rec)
        # This recovery record is done, time to delete it

        db.session.commit()
    except AttributeError:
        db.session.rollback()
        return bad_request("Invalid password format")


    return jsonify({
        'status' : "OK"
    })
