from datetime import datetime
import hashlib, random

def get_user(user_id):
    return {
        'username': 'josh',
        'admin': False,
        'id': user_id
    }

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

def create_url_hash(email):
    if not email: return None
    # Creating secret, url-friendly hash
    time = datetime.now()
    random.seed(time.microsecond)
    random_num = random.random()
    secret_string = f'{email},{time},{random_num}'
    reset_hash = hashlib.sha256(secret_string.encode()).hexdigest()
    return reset_hash