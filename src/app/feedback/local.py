import json
import shutil
import os
import re
import logging
import zipfile
import markdown
import semver
import itertools
import hashlib

from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework import status

logger = logging.getLogger('debug')



def post(request):
    # Post Feedback
    return Response()


def get(request):
    logger
    # Get feedback data
    return Response()
