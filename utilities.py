import sys
sys.path.append('./database')
from db import db_exe, select
from datetime import datetime
import hashlib, random, bcrypt



def get_user(user_id=None, email=None, password=None):
    user = None
    fields = ['id', 'email', 'admin']
    if user_id:
        user = select(fields, 'users', f'id = {user_id}')
    elif email and password:
        password = select('password', 'users', 'email = {email}')
        if password:
    return user if user else None

def validate_reset_hash(reset_hash):
    if 'valid':
        return {
            'response': ({'message': 'Reset link is valid'}, 200),
            'valid': True,
            'status': 'valid'
        }
    elif 'expired':
        return {
            'response': ({'error': 'Reset link expired!'}, 422),
            'valid': False,
            'status': 'expired'
        }
    else:
        return {
            'response': ({'error': 'Link not found'}, 404),
            'valid': False,
            'status': 'not found'
        }

def generate_url_hash(email):
    if not email: return None
    # Creating secret, url-friendly hash
    time = datetime.now()
    random.seed(time.microsecond)
    random_num = random.random()
    secret_string = f'{email},{time},{random_num}'
    reset_hash = hashlib.sha256(secret_string.encode()).hexdigest()
    return reset_hash

def post_reset_hash(reset_hash):
    return True

def change_password(reset_hash):
    return True

def send_reset_email(email, reset_hash):
    return True