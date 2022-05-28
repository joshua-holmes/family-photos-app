import config
from datetime import datetime
from gphotospy import authorize
from gphotospy.album import *
from gphotospy.media import *

service = authorize.init(config.CLIENT_SECRET_FILE)

def get_album_contents():
    album_manager = Album(service)
    album = album_manager.get(config.ALBUM_ID)
    media_manager = Media(service)
    album_media_list = list(media_manager.search_album(album['id']))
    photos_data = []
    for media in album_media_list:
        media_type = media.get('mimeType', '')
        print('MEDIA TYPE', media_type)
        if media_type.find('image') == 0:
            print('here')
            photos_data.append({
                'id': media['id'],
                'baseUrl': media.get('baseUrl'),
                'creationTime': media.get('mediaMetadata', {}).get('creationTime'),
                'width': int(media.get('mediaMetadata', {}).get('width')),
                'height': int(media.get('mediaMetadata', {}).get('height')),
            })
    return photos_data

def get_album_id(title):
    album_manager = Album(service)
    album_iterator = album_manager.list()
    for album in album_iterator:
        if album.get('title') == title:
            return album['id']
    return None

print(get_album_contents())