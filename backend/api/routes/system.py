from app import app
from . import login_required
from flask import jsonify
from db import Department


@app.route("/api/system/statistics", methods=["POST", "GET"])
@login_required(role_allow=["manager"])
def get_statistic():

    query = Department.query.all()
    ret = {
        department.name: sum([user.idea_ref.count()
                              for user in department.reference]) for department in query
    }

    return jsonify({
        'status': "OK",
        'data': ret
    })
