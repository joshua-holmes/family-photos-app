import os, bcrypt, requests, config, sys, utilities
sys.path.append('./database')
from db import select, update, insert, init_db
from flask_mail import Mail, Message
from flask import Flask, session, request, redirect, url_for, g, render_template, Response, send_from_directory
from flask_cors import CORS
from utilities import get_user, res, boolify_users, numify_users
from google_api import get_photos

app = Flask(__name__, static_url_path='', static_folder='client/build')

app.config.from_object(__name__)
app.secret_key = config.APP_KEY
CORS(app, supports_credentials=True, resources={r"/*": {"origins": config.ORIGINS}})

app.config['MAIL_SERVER'] = config.MAIL_SERVER
app.config['MAIL_PORT'] = config.MAIL_PORT
app.config['MAIL_USERNAME'] = config.MAIL_USERNAME
app.config['MAIL_PASSWORD'] = config.MAIL_PASSWORD
app.config['MAIL_USE_TLS'] = config.MAIL_USE_TLS
app.config['MAIL_USE_SSL'] = config.MAIL_USE_SSL
mailer = Mail(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

@app.route('/me')
def me():
    session['hi'] = 'bob'
    user = get_user(user_id=session.get('user_id'))
    if user:
        return res('You are logged in', data={'user': {
            'admin': user['admin'],
            'email': user['email'],
        }})
    return res('You are not authorized', 401)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return res('You must provide email and password to login', 422)
    user = get_user(email=email, password=password)
    if not user:
        return res('Incorrect email or password', 401)
    session['user_id'] = user['id']
    return res('Session created', 201, {'user': {
            'admin': user['admin'],
            'email': user['email'],
        }})
    

@app.route('/logout', methods=['DELETE'])
def logout():
    session.pop('user_id', None)
    return res('Session destroyed')

@app.route('/reset_hash', methods=['POST'])
def create_reset_hash():
    email = request.get_json().get('email')
    if not email:
        return res('You must provide an email address', 422)
    reset_hash = utilities.generate_url_hash(email)
    response = utilities.post_reset_hash(reset_hash, email)
    if 'error' in response[0]:
        return response
    is_successful = utilities.send_reset_email('themusicmanjph@gmail.com', reset_hash, mailer)
    if not is_successful:
        return res('Email failed to send. Please try again.', 500)
    return res('Password reset email sent. Be sure to check your spam. You can close this window now.', 201)
    

@app.route('/check_reset_hash/<reset_hash>')
def check_reset_hash(reset_hash):
    return utilities.validate_reset_hash(reset_hash)['response']

@app.route('/reset_password', methods=['PATCH'])
def reset_password():
    json_data = request.get_json()
    reset_hash = json_data.get('reset_hash')
    password = json_data.get('password')
    if not password:
        return res('Password field is required', 422)
    response = utilities.change_password(reset_hash, password)
    if not response[0]['ok']:
        return response
    # Get user_id from change_password
    user_id = response[0]['data']['user_id']
    is_successful = utilities.expire_hashes(user_id)
    if not is_successful:
        return res('A database error occurred and an email was not sent', 500)
    return response

@app.route('/photos')
def get_photos_data():
    user = get_user(user_id=session.get('user_id'))
    if not user:
        return res('You are not authorized', 401)
    photos = get_photos()
    return res('You are logged in', data={'photos': photos})
    

@app.route('/users')
def get_users():
    user = get_user(user_id=session.get('user_id'))
    if not user:
        return res('You are not authorized', 401)
    users = select(['admin', 'email'], 'users', where='active = 1')
    if not users:
        return res('No users found', 404)
    boolify_users(users)
    return res('Users retrieved', data={'users': users})

@app.route('/users', methods=['PATCH'])
def update_users():
    json_data = request.get_json()
    changed_users = json_data.get('changedUsers', [])
    new_users = json_data.get('newUsers', [])
    deleted_users = json_data.get('deletedUsers', [])
    for list_of_users in [changed_users, new_users, deleted_users]:
        numify_users(list_of_users)
    if not (changed_users or new_users or deleted_users):
        return res('Request data not found', 422)
    # Separate users who have been disabled from users who don't exist
    reinstated_users = []
    brand_new_users = []
    success = True
    for user in new_users:
        is_disabled = select('active', 'users', where=f"email = '{user['email']}' AND active = 0", one=True)
        if is_disabled:
            reinstated_users.append(user)
        else:
            brand_new_users.append(user)
    for user in reinstated_users:
        success &= update('users', {'active': 1, 'admin': user['admin']}, where=f"email = '{user['email']}'")
    for user in brand_new_users:
        success &= insert('users', {'email': user['email'], 'admin': user['admin']})
        title = 'Setup Your Password - Renner Family Photos'
        link = 'http://localhost:3000/login'
        body = f"An account for Renner Family Photos was recently created for you. To setup a password, go to this link and click on 'Reset password' to setup your password: {link}"
        utilities.send_email('themusicmanjph@gmail.com', title, body, mailer)
    for user in changed_users:
        success &= update('users', {'admin': user['admin']}, where=f"email = '{user['email']}'")
    for user in deleted_users:
        success &= update('users', {'active': 0}, where=f"email = '{user['email']}'")
    returned_users = select(['admin', 'email'], 'users', where='active = 1')
    boolify_users(returned_users)
    if not success:
        return res('Not all of the data was updated correctly in the database', 500, {'users': returned_users})
    return res('Database was succesfully updated!', data={'users': returned_users})

@app.route('/caption/<date>')
def get_caption(date):
    user = get_user(user_id=session.get('user_id'))
    if not user:
        return res('You are not authorized', 401)
    data = select(['id', 'text'], 'captions', where=f"date = '{date}'", one=True)
    if not (data and 'text' in data):
        return res('Caption not found', 404)
    return res('Caption found', 200, data=data)
    
@app.route('/caption', methods=['POST'])
def create_caption():
    user = get_user(user_id=session.get('user_id'))
    if not user:
        return res('You are not authorized', 401)
    json_data = request.get_json()
    date = json_data.get('date')
    text = json_data.get('text', '')
    if not date:
        return res('Date parameter must be included!', 422)
    is_successful = insert('captions', {'date': date, 'text': text})
    if not is_successful:
        return res('Something went wrong with the server while creating a new caption. The caption was not saved!', 500)
    data = select(['id', 'text'], 'captions', where=f"date = '{date}'", one=True)
    return res('Successfully saved!', 201, data=data)

@app.route('/caption/<caption_id>', methods=['PATCH'])
def update_caption(caption_id):
    user = get_user(user_id=session.get('user_id'))
    if not user:
        return res('You are not authorized', 401)
    json_data = request.get_json()
    text = json_data.get('text')
    if not text and text != '':
        return res('Text parameter must be included when updating!')
    is_successful = update('captions', {'text': text}, where=f'id = {caption_id}')
    if not is_successful:
        return res('Something went wrong with the server while updating a caption. The changes were not saved!', 500)
    data = select(['id', 'text'], 'captions', where=f"id = '{caption_id}'", one=True)
    return res('Successfully saved!', data=data)

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
    
if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')