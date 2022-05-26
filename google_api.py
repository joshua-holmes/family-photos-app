from gphotospy import authorize
from gphotospy.album import *

CLIENT_SECRET_FILE = "./.secrets/client_secret_700721291989-d3mldjks9s0rcp54h6limclgt3m4r5g5.apps.googleusercontent.com.json"

service = authorize.init(CLIENT_SECRET_FILE)

album_manager = Album(service)
album_iterator = album_manager.list()