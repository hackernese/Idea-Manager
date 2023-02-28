from app import app


@app.route('/api/category/add', methods=['POST'])
def add_category():
    return ""

@app.route('/api/category/delete/<category_id>', methods=['DELETE'])

def delete_category(category_id):
    return ""


@app.route('/api/category/list', methods=['POST'])
def list_all_category():
    return ""


@app.route('/api/category/get/<category_id>', methods=['POST'])
def get_category_info(category_id):
    return ""


@app.route('/api/category/update/<category_id>', methods=['POST'])
def update_category_info(category_id):
    return ""