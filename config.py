import sys
sys.path.append('./.secrets')
from secret_stuff import get_email_password, get_key

APP_KEY = get_key()

MAIL_SERVER = 'smtp.gmail.com'
MAIL_PORT = 465
MAIL_USERNAME = 'joshua.phillip.holmes@gmail.com'
MAIL_PASSWORD = get_email_password()
MAIL_USE_TLS = False
MAIL_USE_SSL = True

CLIENT_SECRET_FILE = "./.secrets/client_secret_700721291989-d3mldjks9s0rcp54h6limclgt3m4r5g5.apps.googleusercontent.com.json"

ALBUM_ID = 'AHNRPkcjzuuMWVo83HE6X5Eq8izQOlslaNVo-s1paRRIdsQxGmteqLpuro421j0yyKzI94LEZ7r8'