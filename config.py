import os, subprocess
from dotenv import load_dotenv

if not os.getenv('GOOGLE_CLIENT_SECRET'):
    print('Pulling in local environment variables...')
    load_dotenv('./.secrets/variables.env')

APP_KEY = os.getenv('FLASK_APP_KEY', '').encode()

MAIL_SERVER = os.getenv('FLASK_MAIL_SERVER')
MAIL_PORT = int(os.getenv('FLASK_MAIL_PORT', 0))
MAIL_USE_TLS = os.getenv('FLASK_MAIL_USE_TLS') in ['True', 'true']
MAIL_USE_SSL = os.getenv('FLASK_MAIL_USE_SSL') in ['True', 'true']
MAIL_USERNAME = os.getenv('FLASK_MAIL_USERNAME')
MAIL_PASSWORD = os.getenv('FLASK_MAIL_PASSWORD')

# For seeding the database if users table is empty
INIT_USER_EMAIL=os.getenv('FLASK_INIT_USER_EMAIL')

# For connecting to the privacy policy page
PRIVACY_LINK = os.getenv('PRIVACY_LINK')

# To use this option as environment variable, save contents of json file to environment variable GOOGLE_CLIENT_SECRET
ALBUM_ID = os.getenv('GOOGLE_ALBUM_ID')