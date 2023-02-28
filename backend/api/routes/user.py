
from app import app

@app.route('/api/user/add', methods=['POST'])
def add_user():
    return ""

@app.route('/api/user/delete/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    return ""

@app.route('/api/user/list', methods=['POST', "GET"])
def list_all_users():
    return ""

@app.route('/api/user/get/<user_id>', methods=['POST', "GET"])
def get_user_info(user_id):
    return ""

@app.route('/api/user/update/<user_id>', methods=['POST'])
def update_user_info(user_id):
    return ""

@app.route('/api/user/<user_id>/role/update', methods=['POST'])
def update_user_role(user_id):
    return ""

@app.route('/api/user/<user_id>/export', methods=["GET",'POST'])
def export_user_config(user_id):
    return ""

@app.route('/api/user/<user_id>/import', methods=['POST'])
def import_user_config(user_id):
    return ""


@app.route('/api/user/<user_id>/email', methods=["GET",'POST'])
def grab_user_emails(user_id):
    return ""



