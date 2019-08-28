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

from search.utils import DocsIndexer


logger = logging.getLogger('debug')

ES_INDEX_PREFIX = settings.ES_INDEX_PREFIX
ES_PORT = settings.ES_PORT
ES_HOST_URL = settings.ES_HOST_URL


def post(request):
    root_path = request.POST.get('root_path', '').strip('/')
    uploaded_file = request.FILES.get('file')

    if uploaded_file and uploaded_file.name.endswith('.zip'):
        zipf = zipfile.ZipFile(uploaded_file)
        path = os.path.join(*(
            settings.MEDIA_ROOT,
            'docs',
            root_path))

        if os.path.exists(path):
            shutil.rmtree(path)

        for zipped_file in zipf.namelist():
            path = os.path.join(*(
                'docs',
                root_path,
                zipped_file.lower()))

            if path.endswith('/'):
                try:
                    os.makedirs(path)
                except:
                    pass
            else:
                content = ContentFile(zipf.read(zipped_file))
                read_contents_bytes = content.read()
                read_contents_str = read_contents_bytes.decode('utf-8')
                indexer = DocsIndexer(
                    ES_HOST_URL,
                    ES_PORT,
                    'docs',
                    ES_INDEX_PREFIX)
                doc = {
                    "content": read_contents_str,
                    "path": path
                }

                indexer.index_doc(doc)
                default_storage.save(path, content)
    else:
        return Response(
            {'file': 'ZIP file not found'},
            status=status.HTTP_400_BAD_REQUEST)

    return Response()


def get(request):
    try:
        request_path_segments = request.path_info.lower().split('/')

        # remove '/api/docs/'
        requested_file = '/'.join(request_path_segments[3:])

        path = os.path.join(*(
            settings.MEDIA_ROOT,
            'docs',
            requested_file))

        logger.debug('Docs get on path %s', path)

        requested_file_segments = requested_file.split('/')
        library_name = requested_file_segments[0] if len(requested_file_segments) > 0 else ''
        version = requested_file_segments[1] if len(requested_file_segments) > 1 else ''
        file_path = '/'.join(requested_file_segments[2:])

        library_path = os.path.join(*(
            settings.MEDIA_ROOT,
            'docs',
            library_name))

        logger.debug('Docs get version %s', version)

        if version == 'latest':
            all_versions = next(os.walk(library_path))[1]
            latest_version = '0.0.0'

            if len(all_versions) > 1:
                for a, b in itertools.combinations(all_versions, 2):
                    highest_version = semver.max_ver(a, b)

                    if highest_version > latest_version:
                        latest_version = highest_version
            else:
                latest_version = all_versions[0]

            latest_file_pointer = os.path.join(*(
                settings.MEDIA_ROOT,
                'docs',
                library_path,
                latest_version,
                file_path))
            path = latest_file_pointer

            logger.debug('Docs get latest on path %s', path)

        if re.match(r'[\w,\s\S]+\.[A-Za-z]{2,4}$', path):
            content = open(path, 'rb').read()

            if path.endswith('.json'):
                try:
                    content = json.loads(content.decode('utf-8'))

                    return Response(content)
                except ValueError:
                    return Response(
                        {'error': 'JSON file cannot be decoded'},
                        status=status.HTTP_400_BAD_REQUEST)
            elif path.endswith('.md'):
                content = markdown.markdown(
                    content.decode('utf-8'),
                    output_format='html5')

                return HttpResponse(content=content)
            elif path.endswith('.png'):
                return HttpResponse(content=content, content_type='image/png')
            elif path.endswith('.jpeg'):
                return HttpResponse(content=content, content_type='image/jpeg')
            else:
                return HttpResponse(content=content)
        else:
            result = []

            for item in os.listdir(path):
                item_path = os.path.join(*(path, item))

                if os.path.isdir(item_path):
                    item_path += '/'

                item_path = item_path.replace(settings.MEDIA_ROOT, '')

                result.append(item_path[1:])

            return Response({'files': result})

        return Response()
    except IOError as exc:
        return Response(
            {
                'error': {
                    'code': exc.errno,
                    'message': exc.strerror
                }
            },
            status=status.HTTP_400_BAD_REQUEST
        )
