# To get a new Google Photos Api token (since Google will require a new one
# every 2 weeks before it has approved of your app), just run this script,
# Google will then open a browser, then sign in using your Google account.

import os
from datetime import datetime
from gphotospy import authorize
from gphotospy.album import *
from gphotospy.media import *

curdir = os.path.dirname(os.path.realpath(__file__))
secret_dir = f'{curdir}/'
secret_files = os.listdir(secret_dir)
client_secret = None
for f in secret_files:
    if f[:13] == 'client_secret' and f[-5:] == '.json':
        client_secret = secret_dir + f
service = authorize.init(client_secret)