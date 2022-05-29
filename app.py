import os, bcrypt, requests, config
from flask_mail import Mail, Message
from flask import Flask, session, request, redirect, url_for, g, render_template, Response, send_from_directory
from utilities import get_user, validate_reset_hash, post_reset_hash, generate_url_hash, post_reset_hash, send_reset_email, change_password, expire_hashes, process_photo_dates, res
from google_api import get_photos

app = Flask(__name__)

app.secret_key = config.APP_KEY
app.config['MAIL_SERVER'] = config.MAIL_SERVER
app.config['MAIL_PORT'] = config.MAIL_PORT
app.config['MAIL_USERNAME'] = config.MAIL_USERNAME
app.config['MAIL_PASSWORD'] = config.MAIL_PASSWORD
app.config['MAIL_USE_TLS'] = config.MAIL_USE_TLS
app.config['MAIL_USE_SSL'] = config.MAIL_USE_SSL


mail = Mail(app)



directory = os.getcwd() + f'/client/build'

@app.route('/me')
def me():
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

@app.route('/create_reset_hash', methods=['POST'])
def create_reset_hash():
    email = request.get_json().get('email')
    if not email:
        return res('You must provide an email address', 422)
    reset_hash = generate_url_hash(email)
    response = post_reset_hash(reset_hash, email)
    if 'error' in response[0]:
        return response
    is_successful = send_reset_email(email, reset_hash, mail)
    if not is_successful:
        return res('Email failed to send. Please try again.', 500)
    return res('Password reset email sent. Be sure to check your spam. You can close this window now.', 201)
    

@app.route('/check_reset_hash', methods=['POST'])
def check_reset_hash():
    reset_hash = request.get_json().get('reset_hash')
    return validate_reset_hash(reset_hash)['response']

@app.route('/reset_password', methods=['PATCH'])
def reset_password():
    json_data = request.get_json()
    reset_hash = json_data.get('reset_hash')
    password = json_data.get('password')
    if not password:
        return res('Password field is required', 422)
    result = validate_reset_hash(reset_hash)
    if not result['valid']:
        return result['response']
    result = change_password(reset_hash, password)
    if not result[0]['ok']:
        return result
    # Get user_id from change_password
    user_id = result[0]['data']['user_id']
    is_successful = expire_hashes(user_id)
    if not is_successful:
        return res('A database error occurred and an email was not sent', 500)
    return result

@app.route('/photos_data')
def get_photos_data():
    user = get_user(user_id=session.get('user_id'))
    if user:
        photos = get_photos()
        dates = process_photo_dates(photos)
        return res('You are logged in', data={'photos': photos, 'dates': dates})
    return res('You are not authorized', 401)


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
    
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))