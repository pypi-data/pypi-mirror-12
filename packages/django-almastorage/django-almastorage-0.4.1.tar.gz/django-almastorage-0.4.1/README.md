almastorage
========

Simple web-application used for accessing project with SwiftStack storage

Quick Install
-------------

1) Install almastorage:

    pip install django-almastorage

2) Add 'almastorage' into your INSTALLED_APPS in project settings 

3) Add fields into project settings infortation from your swiftstack:

	SW_USERNAME = 'user'//account name

	SW_KEY = 'key' //account key
	
	SW_AUTH_URL = 'http://your_url' //auth_url 

	AUTH_USER_MODEL = 'your User model' //your User model

4) Migrate

	./manage.py migrate almastorage

5) Create default container

	./manage.py shell

	> from almastorage.models import SwiftContainer

	> SwiftContainer.create_default_container()

-------------
You can download it directly from storage, but in that case your filename will be some key generated
from your filename and uploaded date. For download you can use 'download' view from views.py, just 
append to your urls url(r'^files', include('almastorage.urls')), and then download using swiftfile id, 'http://your_domain/files/download/(?P<file_id>[0-9]+)/'
-------------
Use API for upload: http://yourdomain/api/v1/storage/:SW_USERNAME/upload/ 
	post_data={
		'filename': filename,
		'content_type': mime_type,
		'uploaded_file': base64.b64encode(open(file_path, "rb").read())
		}
Use API for download: http://yourdomain/api/v1/file/:id/download/ 
	which will return {'temp_url': 'http://temp_url'}, use get to this url to get the file

