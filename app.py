import os, sys, bcrypt, requests
from flask_mail import Mail, Message
from flask import Flask, session, request, redirect, url_for, g, render_template, Response, send_from_directory
from secret_stuff import get_key, get_email_password
from utilities import get_user, validate_reset_hash, post_reset_hash, generate_url_hash, post_reset_hash, send_reset_email, change_password, expire_hashes

app = Flask(__name__)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'joshua.phillip.holmes@gmail.com'
app.config['MAIL_PASSWORD'] = get_email_password()
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

# Secret key for sessions
app.secret_key = get_key()

directory = os.getcwd() + f'/client/build'

@app.route('/')
def index():
    return send_from_directory(directory=directory, path='index.html')

@app.route('/<path:path>')
def media(path):
    if '.' in path:
        return send_from_directory(directory=directory, path=path)
    return redirect('/')

@app.route('/static/<folder>/<file>')
def static_media(folder, file):
    path = folder + '/' + file
    d = directory + '/static'
    return send_from_directory(directory=d, path=path)

# @app.route('/<path>')
# def media(folder, file):
#     d = directory + '/static'
#     path = folder + '/' + file
#     print("DIR STATIC", d, path)
#     return send_from_directory(directory=d, path=path)

# @app.route('/manifest.json')
# def manifest():
#     return send_from_directory(directory=directory, path='manifest.json')

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
    response = post_reset_hash(reset_hash, email)
    if 'error' in response[0]:
        return response
    is_successful = send_reset_email(email, reset_hash, mail)
    if not is_successful:
        return {'error': 'Email failed to send. Please try again.'}
    return {'message': 'Password reset email sent'}, 201
    

@app.route('/api/check_reset_hash/<reset_hash>')
def check_reset_hash():
    reset_hash = request.get_json().get('reset_hash')
    return validate_reset_hash(reset_hash)['response']

@app.route('/api/reset_password', methods=['POST'])
def reset_password():
    json_data = request.get_json()
    reset_hash = json_data.get('reset_hash')
    password = json_data.get('password')
    if not password:
        return {'error': 'Password field is required'}, 422
    result = validate_reset_hash(reset_hash)
    if not result['valid']:
        return result['response']
    result = change_password(reset_hash, password)
    if not result[0].get('message'):
        return result
    # Get user_id from change_password
    result = list(result)
    user_id = result.pop()
    result = tuple(result)
    is_successful = expire_hashes(user_id)
    if not is_successful:
        return {'error': 'A database error occurred and an email was not sent'}, 500
    return result


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
    
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))