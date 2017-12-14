import json
import shutil
import os
import re
import zipfile
import markdown
import semver
import itertools


from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework import status


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
                default_storage.save(path, content)
    else:
        return Response(
            {'file': 'ZIP file not found'},
            status=status.HTTP_400_BAD_REQUEST)

    return Response()


def get(request):
    try:
        path = os.path.join(*(
            settings.MEDIA_ROOT,
            request.path_info[5:].lower()))

        path_segments = path.split('/')
        library_name = path_segments[5] if len(path_segments) > 5 else ''
        version = path_segments[6] if len(path_segments) > 6 else ''
        file_path = "/".join(path_segments[7:])
        library_path = os.path.join(*(
            settings.MEDIA_ROOT,
            'docs',
            library_name))

        if version == "latest":
            all_versions = next(os.walk(library_path))[1]
            latest_version = "0.0.0"
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
                return HttpResponse(content=content, content_type="image/png")
            elif path.endswith('.jpeg'):
                return HttpResponse(content=content, content_type="image/jpeg")
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
