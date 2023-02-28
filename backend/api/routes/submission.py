from app import app

@app.route('/api/submission/add', methods=['POST'])
def add_submission():
    return ""

@app.route('/api/submission/delete/<submission_id>', methods=['DELETE'])
def delete_submission(submission_id):
    return ""

@app.route('/api/submission/list', methods=['GET','POST'])
def list_all_submissions():
    return ""

@app.route('/api/submission/get/<submission_id>', methods=['GET','POST'])
def get_submission_info(submission_id):
    return ""

@app.route('/api/submission/update/<submission_id>', methods=['POST'])
def update_submission_info(submission_id):
    return ""