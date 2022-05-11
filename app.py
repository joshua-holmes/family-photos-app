import os
from flask import Flask, session

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return '<p>Hello, World!</p>'

@app.route('/me')
def me_api():
    user = get_current_user()
    return {
        'username': user.username,
        'admin': user.admin
    }

@app.route('/api/reset_password/<hash>')
def reset_password(hash):
    pass

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))