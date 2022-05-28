import config
from gphotospy import authorize
from gphotospy.album import *
from gphotospy.media import *

CLIENT_SECRET_FILE = config.CLIENT_SECRET_FILE

service = authorize.init(CLIENT_SECRET_FILE)

album_manager = Album(service)
album = album_manager.get(config.ALBUM_ID)