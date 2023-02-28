from app import app, mail


@app.route("/api/auth/login", methods=["POST"])
def login():
    return ""

@app.route('/api/auth/logout', methods=["POST"])
def logout():
    return ""

@app.route("/api/auth/reset", methods=["POST"])
def reset_password():
    return ""

@app.route('/api/auth/reset/confirm', methods=["POST"])
def confirm_reset_passwd():
    return ""


@app.route("/api/auth/reset/new", methods=["POST"])
def reset_new_password():
    return ""

