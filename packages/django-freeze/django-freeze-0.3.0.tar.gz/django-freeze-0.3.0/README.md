# django-freeze
django-freeze generates the static version of any django site.

Just input ``python manage.py generate_static_site`` in the shelll :)

##Requirements / Dependencies
- Python 2.6, Python 2.7
- Django 1.6.5 through Django 1.8
- BeautifulSoup4
- requests
- xmltodict

##Installation
- Run ``pip install django-freeze`` or manually download [django-freeze](http://pypi.python.org/pypi/django-freeze), [BeautifulSoup4](https://pypi.python.org/pypi/beautifulsoup4), 
[requests](https://pypi.python.org/pypi/requests/), [xmltodict](https://pypi.python.org/pypi/xmltodict)
- Add ``freeze`` to ``settings.INSTALLED_APPS``
- Restart your application server

##Configuration (optional)

All these settings are optional, if not defined in ``settings.py`` the default values (listed below) will be used.

```python

#the absolute path where to store the .zip and the html files
#default value is a folder named 'freeze' located as sibling of 'settings.MEDIA_ROOT'
FREEZE_ROOT = '/...' 

#tells 'freeze' if the urls should be fetched using https instead of http protocol
FREEZE_USE_HTTPS = False

#if True 'freeze' will fetch each url founded in sitemap.xml
FREEZE_SITEMAP_MODE = True

#if True 'freeze' will follow and fetch recursively each link-url founded in each page
FREEZE_FOLLOW_MODE = False

#if true 'freeze' will send an email to managers containing the list of all invalid urls (404, 500, etc..)
FREEZE_REPORT_INVALID_URLS = False

#the invalid urls email report subject
FREEZE_REPORT_INVALID_URLS_SUBJECT = '[freeze] invalid urls'

#the name of the zip file created
FREEZE_ZIP_NAME = 'freeze' 

#if True the .zip created will contain also the MEDIA folder and all its content
FREEZE_ZIP_INCLUDE_MEDIA = True

#if True the .zip created will contain also the STATIC folder and all its content
FREEZE_ZIP_INCLUDE_STATIC = true

#a tuple containing the list of the apps for which include static files, if empty or None the static files of all installed-apps will be included
FREEZE_ZIP_INCLUDE_STATIC_APPS = ()
```
Add **freeze.urls** to ``urls.py`` if you want superusers and staff able to generate the static site using url.

```python
urlpatterns = patterns('',
    ...
    url(r'^freeze/', include('freeze.urls')),
    ...
)
```

##Usage

####Terminal

Run ``python manage.py generate_static_site`` 

####URL
Superusers and staff can **download a .zip** containing the generated static site using the following url: 

``/freeze/generate-static-site/``

*(the time necessary to generate the static site depends on the size of the project)*

##License
The MIT License (MIT)

Copyright (c) 2015 Fabio Cacccamo - fabio.caccamo@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

