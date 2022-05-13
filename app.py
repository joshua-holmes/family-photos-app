import os, sys, bcrypt
from flask import Flask, session, request, redirect, url_for
from utilities import get_user, validate_reset_hash, post_reset_hash, generate_url_hash, post_reset_hash, send_reset_email

# Add a python module in this location with method that
# returns a secret key as 'bytes' data type
sys.path.append('./.secrets')
from secret_key import get_key


app = Flask(__name__)

# Secret key for sessions
app.secret_key = get_key()

@app.route('/')
def index():
    return '<p>Hello, World!</p>'

@app.route('/api/me')
def me():
    user_id = session.get('user_id')
    user = get_user(user_id=user_id)
    if user:
        return {'message': 'You are logged in', 'user': {
            'admin': user['admin'],
            'email': user['email'],
        }}
    return {'error': 'You are not authorized'}, 401

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return {'error': 'You must provide email and password to login'}, 422
    user = get_user(email=email, password=password)
    if not user:
        return {'error': 'You are not authorized'}, 401
    session['user_id'] = user['id']
    return {'message': 'Session created'}, 201
    

@app.route('/api/logout', methods=['DELETE'])
def logout():
    session.pop('user_id', None)
    return {'message': 'Session destroyed'}

@app.route('/api/create_reset_hash', methods=['POST'])
def create_reset_hash():
    email = request.get_json().get('email')
    if not email:
        return {'error': 'You must provide an email address'}, 422
    reset_hash = generate_url_hash(email)
    isSuccessful = post_reset_hash(reset_hash)
    if not isSuccessful:
        return {'error': 'A database error occurred and an email was not sent'}
    isSuccessful = send_reset_email(email, reset_hash)
    if not isSuccessful:
        return {'error': 'Email failed to send. Please try again.'}
    return {'message': 'Password reset email send'}, 201
    

@app.route('/api/check_reset_hash')
def check_reset_hash(reset_hash=None):
    return validate_reset_hash(reset_hash)['response']

@app.route('/api/reset_password/<reset_hash>', methods=['POST'])
def reset_password(reset_hash=None):
    password = request.get_json().get('password')
    if not password:
        return {'error': 'Password field is required'}, 422
    result = validate_reset_hash(reset_hash)
    if not result['valid']:
        return result['response']
    isSuccessful = change_password(reset_hash)
    if not isSuccessful:
        return {'error': 'An unexpected error occurred'}
    return {'message': 'Password successfully reset'}, 201


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
    
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))