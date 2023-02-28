from app import app


@app.route('/api/department/add', methods=['POST'])
def add_department():
    return ""


@app.route('/api/department/delete/<department_id>', methods=['DELETE'])
def delete_department(department_id):
    return ""



@app.route('/api/department/list', methods=['GET','POST'])
def list_all_department():
    return ""


@app.route('/api/department/get/<department_id>', methods=['GET','POST'])
def get_department_info(department_id):
    return ""



@app.route('/api/department/update/<department_id>', methods=['POST'])
def update_department_info(department_id):
    return ""