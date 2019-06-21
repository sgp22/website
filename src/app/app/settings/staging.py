from __future__ import absolute_import, unicode_literals

from .base import *

DEBUG = os.getenv(
    'DEBUG',
    'true').lower() == 'true'

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'z4w6&+0zrxxx#6-8m9w8!s*ms1f#@0y%18+x!ct=w&s7lyn%v&'

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

HEADLESS_PREVIEW_CLIENT_URLS = {
    'default': 'https://staging.design.infor.com/'
}

try:
    from .local import *
except ImportError:
    pass
