from app import app


@app.route('/api/role/add', methods=['POST'])
def add_role() :
    return ""

@app.route('/api/role/delete/<role_id>', methods=['DELETE'])
def delete_role(role_id : int):
    return ""

@app.route('/api/role/list', methods=['POST', "GET"])
def list_all_roles():
    return ""

@app.route('/api/role/get/<role_id>', methods=['POST', "GET"])
def get_role_info(role_id : int):
    return ""

@app.route('/api/role/update/<role_id>', methods=['POST'])
def update_role_info(role_id : int):
    return ""