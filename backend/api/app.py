from flask import Flask
from flask_cors import CORS
from flask_mail import Mail
from setting import MAIL_CONFIG


#comment
app = Flask(__name__)
# Initializing an app object
CORS(app)
# Allowing Cross-Origin-Resource-Sharing from the frontend


# Configuring the server parameters in order to connect to the SMTP server
# A.K.A : Let's just say connect to the email address for the sake of simplicity
app.config.update(MAIL_CONFIG)
mail = Mail(app)
# Instaniate an Email wrapper around the "app" object in Flask
# so it can send emails later