import config, os
from datetime import datetime
from gphotospy import authorize
from gphotospy.album import *
from gphotospy.media import *

secret_dir = './.secrets/'
secret_files = os.listdir(secret_dir)
client_secret = None
for f in secret_files:
    if f[:13] == 'client_secret' and f[-5:] == '.json':
        client_secret = secret_dir + f
service = authorize.init(client_secret)

def get_photos():
    album_manager = Album(service)
    album = album_manager.get(config.ALBUM_ID)
    media_manager = Media(service)
    album_media_list = list(media_manager.search_album(album['id']))
    photos = []
    for media in album_media_list:
        media_type = media.get('mimeType', '')
        if media_type.find('image') == 0:
            photos.append({
                'id': media['id'],
                'baseUrl': media.get('baseUrl'),
                'creationTime': media.get('mediaMetadata', {}).get('creationTime'),
                'width': int(media.get('mediaMetadata', {}).get('width')),
                'height': int(media.get('mediaMetadata', {}).get('height')),
            })
    return photos

def get_album_id(title):
    album_manager = Album(service)
    album_iterator = album_manager.list()
    for album in album_iterator:
        if album.get('title') == title:
            return album['id']
    return None