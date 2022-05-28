import sys, hashlib, random, bcrypt
sys.path.append('./database')
from db import select, insert, update
from datetime import datetime, timedelta
from dateutil.parser import parse
from flask_mail import Message

def get_user(user_id=None, email=None, password=None):
    user = None
    fields = ['id', 'email', 'admin']
    if user_id:
        user = select(fields, 'users', where=f'id = {user_id}', one=True)
        if user:
            return user
    elif email and password:
        fields.append('password_hash')
        user = select(fields, 'users', where=f"email = '{email}'", one=True)
        if user and 'password_hash' in user:
            password_hash = user.pop('password_hash')
            try:
                is_match = bcrypt.checkpw(password.encode(), password_hash.encode())
                if is_match:
                    return user
            except Exception as e: print("BCRYPT:", e)
    return None

def validate_reset_hash(reset_hash):
    expiration_str = select('expiration_time', 'reset_hashes', where=f"hash = '{reset_hash}'", one=True)
    if not (expiration_str and 'expiration_time' in expiration_str):
        return {
            'response': ({'error': 'Link not found'}, 404),
            'valid': False,
            'status': 'not found'
        }
    expiration_time = parse(expiration_str['expiration_time'])
    if expiration_time < datetime.now():
        return {
            'response': ({'error': 'Reset link expired!'}, 422),
            'valid': False,
            'status': 'expired'
        }
    return {
        'response': ({'message': 'Reset link is valid'}, 200),
        'valid': True,
        'status': 'valid'
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

def post_reset_hash(reset_hash, email):
    now = datetime.now()
    time_limit = timedelta(hours=1)
    expiration_time = str(now + time_limit)
    q_res = select('id', 'users', where=f"email = '{email}'", one=True)
    if not (q_res and q_res.get('id')):
        return {'error': 'Email does not exist in database. Please contact administrator to be added.'}, 422
    user_id = q_res['id']
    data = {
        'hash': reset_hash,
        'expiration_time': expiration_time,
        'user_id': user_id
    }
    is_successful = insert('reset_hashes', data)
    if not is_successful:
        return {'error': 'A database error occurred and an email was not sent'}, 500
    return {'message': 'Reset hash successfully created'}, 201

def change_password(reset_hash, password):
    check = validate_reset_hash(reset_hash)
    if not check['valid']:
        return check['response']
    password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    if type(password_hash) is bytes: password_hash = password_hash.decode()
    data = {
        'password_hash': password_hash
    }
    user_data = select('user_id', 'reset_hashes', where=f"hash = '{reset_hash}'", one=True)
    if not (user_data and 'user_id' in user_data):
        return {'error': 'Cannot find user'}, 404
    user_id = user_data['user_id']
    is_successful = update(
        'users', data, where=f"id = '{user_id}'")
    if not is_successful:
        return {'error': 'An unexpected database error occurred'}, 500
    return {'message': 'Password successfully created'}, 201, user_id

def send_reset_email(email, reset_hash, mail):
    message = Message('Hellow', sender='hello@jpholmes.com', recipients=['themusicmanjph@gmail.com'])
    message.body = f"Hi! Please follow this link: http://127.0.0.1:5000/api/reset_password/{reset_hash}"
    test = mail.send(message)
    print(test)
    return True

def expire_hashes(user_id):
    return update('reset_hashes', {'expiration_time': str(datetime.now())}, where=f"user_id = '{user_id}'")

def process_photo_dates(photos):
    result = {}
    for photo in photos:
        date = parse(photo['creationTime'])
        result.setdefault(date.year, {}).setdefault(date.month, {}).setdefault(date.day, True)
    return result