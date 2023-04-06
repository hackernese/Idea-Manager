
import os


basedir = os.path.abspath(os.path.dirname(__file__))
os.chdir(basedir)


TOKEN_EXPIRY_DAYS : int = 30
# The expiry days for all of the cookies when a user logs in

RECOVERY_TOKEN_EXPIRY_MINUTES : int = 15
# Indicates how many minutes will a recovery token record be valid before it's expired


DATABASE_URI = f'sqlite:///{basedir}/storage.db'
# Database URI string, change this to another one when being deployed in production

PORT = 8080
# What port to run this API on

SSL = False
# Do not use encryption ( False )
# Use encryption = True

FRONTEND_PORT = 3000
# ! NOTE : Remember to change it to 80 once deployed

RECOVERY_URL_BASE = "localhost";
# Later on when it is crafted, it will be something like this
# ==> https://localhost:PORT/recovery/r/<token>
# ! NOTE : This url is on the frontend, not the URL Pointing to the API



# --------- Pagination setting -------------------

MAX_USER_PER_PAGE = 10
# Maximum amount of users per page
MAX_IDEA_PER_PAGE = 5
# Maximum amount of ideas per page


# ------------ Emails services -----------------
MAIL_CONFIG = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": "noreply.ideamanager.2023@gmail.com",
    "MAIL_PASSWORD": "dcttroucyyzopmvj"
    # Nope this is not the real password of this email address
    # More like an app password which can be used to interact with
    # this email from insecure ways of logging in. Gmail is such a
    # pain to setup noreply email, but at least it's secured tho LOL
    # TODO : For the sake of safety, move this "MAIL_PASSWORD" as an environment variable later
    # TODO : this is so unprofessional :(
    # ! This is a test email so i will publicly give my password in case i forget it : SuperRandomPassword123
}




# Default user list, leave it empty if you want to manually add the user yourself
DEFAULT_USER_LIST = [
    {
        'email' : 'manager@gmail.com',
        'name' : 'manager',
        'pass' : 'manager',
        'department' : 'Security',
        'role' : 'manager'
    },
    {
        'email' : "admin@gmail.com",
        'name' : "admin",
        'pass' : "admin",
        "department" : "University",
        "role" : "administrator"
    },
    {
        'email' : "staff@gmail.com",
        'name' : "staff",
        'pass' : "staff",
        "department" : "University",
        "role" : "staff"
    }
]
DEFAULT_ROLE_LIST = [
    {
        "r":"administrator",
        "m" : True # Mandatory, cannot delete me
    },
    {
        "r":"manager",
        "m" : True # Mandatory, cannot delete me
    },
    {
        "r":"coordinator",
        "m" : True # Mandatory, cannot delete me
    },
    {
        "r":"staff",
        "m" : True # Mandatory, cannot delete me
    }

]

DEFAULT_DEPARTMENT = [
    "Security",
    "University",
    "Business"
]