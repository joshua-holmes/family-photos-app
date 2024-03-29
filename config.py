import os, subprocess
from dotenv import load_dotenv
from utilities import format_domains

if not os.getenv('FLASK_APP_KEY'):
    print('Pulling in local environment variables...')
    load_dotenv('./.secrets/env')

if os.getenv('FLASK_APP_KEY'):
    print('Environment variables loaded')
else:
    print('ERROR: Environment variables not loaded')

APP_KEY = os.getenv('FLASK_APP_KEY', '').encode()

ORIGINS = format_domains(os.getenv('DOMAINS'))

MAIL_SERVER = os.getenv('FLASK_MAIL_SERVER')
MAIL_PORT = int(os.getenv('FLASK_MAIL_PORT', 0))
MAIL_USE_TLS = os.getenv('FLASK_MAIL_USE_TLS') in ['True', 'true']
MAIL_USE_SSL = os.getenv('FLASK_MAIL_USE_SSL') in ['True', 'true']
MAIL_USERNAME = os.getenv('FLASK_MAIL_USERNAME')
MAIL_PASSWORD = os.getenv('FLASK_MAIL_PASSWORD')

# For seeding the database if users table is empty
INIT_USER_EMAIL=os.getenv('FLASK_INIT_USER_EMAIL')

ALBUM_ID = os.getenv('GOOGLE_ALBUM_ID')
ALBUM_TITLE = os.getenv('GOOGLE_ALBUM_TITLE')