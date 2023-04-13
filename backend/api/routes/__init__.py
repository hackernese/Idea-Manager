import automodinit
from flask import request, jsonify
from db import Sessions, UserRoles, ROLE_ID_LIST, db
from functools import wraps
from datetime import datetime

UNAUTHORIZED_RESPONSE = {
    "status": "FAIL",
    'err': "Unauthorized"
}


def bad_request(msg): return (jsonify({'status': "FAIL", 'err': msg}), 400)
def created_request(msg): return (jsonify({'status': "FAIL", 'err': msg}), 201)


def unauthorized_req(msg): return (
    jsonify({'status': "FAIL", 'err': msg}), 401)


def login_required(role_allow: str | list = "*", allow_personal_user=False) -> callable:
    """

        Enforcing Authentication on this route, if there is no authentication it is going
        to return an error. Once there is authentication detected, this decorator will detect
        is the user authorized to access this route, the route is determined to be authorized or
        not based on the "role_allow" list being passed in.

        + role_allow : determine which roles are allowed to access, "*" mean all
            type : List | str

        + allow_user : With this, it will check to see if "user_id" is being passed in the URL or not
        if it exits, it will check if whoever is requesting this route matches that "user_id" or not
        . If it matches and allow_user = True, then the user is allowed to access, otherwise, the
        users themselves can't access even if their ID actually matches the "user_id" in the route
            type : bool

        Return : wrapper function
            type : Callable
    """

    def wrapper(f):

        # Return an error if this request was made by a user who has not logged in
        @wraps(f)
        def http_wrapper(*args, **kwargs):

            token = request.headers.get("Authorization")

            if not token:
                return jsonify(UNAUTHORIZED_RESPONSE)

            session = Sessions.query.filter_by(token=token).first()

            if role_allow != "*":

                # Time to check to see if the user is authorized to enter this route
                # or not

                authorized_role_list = [ROLE_ID_LIST[i]
                                        for i in role_allow if ROLE_ID_LIST]
                # Grabbing the list of role id which this user is allowed to be in

                ret = session.user.userrole_ref.filter(
                    UserRoles.roleid.in_(authorized_role_list)).first()
                # Checking if this user is inside the authorized role id list

                if not ret:

                    # Opps, unauthorized !
                    return jsonify(UNAUTHORIZED_RESPONSE)

            if not session:
                return jsonify(UNAUTHORIZED_RESPONSE)

            if allow_personal_user and "user_id" in kwargs:
                if not session.user.is_admin() and not session.user.is_manager():
                    # If this user is an administrator or manager, then he/she is allowed to
                    # full access to this route
                    # if they are normal users then i have to check to see if their id matches
                    # the user_id first
                    if str(session.user.id) != kwargs['user_id']:
                        return jsonify(UNAUTHORIZED_RESPONSE)

            if session.expiry_time < datetime.now():
                # Checking if the session has expired or not
                # It has expired, time to delete it and also notify the user
                db.session.delete(session)
                db.session.commit()
                return jsonify({
                    'status': "FAIL",
                    'err': "Expired session"
                }), 401

            request.session = session
            # Matching a session here ( A.K.A : Sessions() instance )

            return f(*args, **kwargs)

        return http_wrapper

    return wrapper


# <--- See ? it will get rewritten, End of Story !
__all__ = ["I will get rewritten"]
automodinit.automodinit(__name__, __file__, globals())
del automodinit
# OK here is the thing, please don't ask me to explain the two lines of code above,
# they were recommended by the official docs => https://pypi.org/project/automodinit/
# Why do they exist ? good question
# Because i am tired to including new python modules files which i create but always forget to
# manually add an "import" line within this __init__.py, and it wastes my precious time to manually
# do so, which is why those two lines exist, it will just take care of that for me
