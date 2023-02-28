from flask import Flask
from flask_cors import CORS


#comment
app = Flask(__name__)
# Initializing an app object
CORS(app)
# Allowing Cross-Origin-Resource-Sharing from the frontend

