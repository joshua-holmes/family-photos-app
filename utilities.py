def get_current_user(user_id):
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