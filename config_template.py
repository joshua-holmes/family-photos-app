import os
from utilities import create_secret_file
APP_KEY = os.getenv('FLASK_APP_KEY', '').encode() or b'pickYOURcrazyyyyykey934k1$!@$&!*@$*'

MAIL_SERVER = os.getenv('FLASK_MAIL_SERVER') or 'smtp.gmail.com'
MAIL_PORT = int(os.getenv('FLASK_MAIL_PORT', 0)) or 465
MAIL_USE_TLS = os.getenv('FLASK_MAIL_USE_TLS') == 'True' or False
MAIL_USE_SSL = os.getenv('FLASK_MAIL_USE_SSL') == 'True' or True
MAIL_USERNAME = os.getenv('FLASK_MAIL_USERNAME') or 'example@gmail.com'
MAIL_PASSWORD = os.getenv('FLASK_MAIL_PASSWORD') or 'gmailpa$$w0rd'

# For seeding the database if users table is empty
INIT_USER_EMAIL=os.getenv('FLASK_INIT_USER_EMAIL')  or 'example@email.com'

# To use this option as environment variable, save contents of json file to environment variable GOOGLE_CLIENT_SECRET
CLIENT_SECRET_FILE = create_secret_file(os.getenv('GOOGLE_CLIENT_SECRET')) or "./.secrets/client_secret.json"
ALBUM_ID = os.getenv('GOOGLE_ALBUM_ID') or 'getYourAlbumIDFromGoogle'