import json
import os
import re
import logging
import zipfile
import botocore
import boto3
import markdown
import itertools
import semver


from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework import status

from . import matching_s3_objects

logger = logging.getLogger('debug')


class UniqueDict(dict):
    def __setitem__(self, key, value):
        if key not in self:
            dict.__setitem__(self, key, value)
        else:
            raise KeyError("Key already exists")

def get_filtered_result(bucket_name, path):
    result = []
    filtered_result = set()
    for item in matching_s3_objects.get_matching_s3_keys(bucket=bucket_name, prefix=path, suffix=('')):
        result.append(item)

    for item in result:
        regex = r"({}.*?/|{}.*)".format(path, path)
        patterns = re.compile(regex)
        match = patterns.search(item)

        filtered_result.add(match.group(1))

    return filtered_result

def post(request):
    root_path = request.POST.get('root_path', '').strip('/')
    uploaded_file = request.FILES.get('file')

    if uploaded_file and uploaded_file.name.endswith('.zip'):
        zipf = zipfile.ZipFile(uploaded_file)

        for zipped_file in zipf.namelist():
            path = os.path.join(*(
                'docs',
                root_path,
                zipped_file.lower()))
            content = ContentFile(zipf.read(zipped_file))
            default_storage.save(path, content)
    else:
        return Response(
            {'file': 'ZIP file not found'},
            status=status.HTTP_400_BAD_REQUEST)

    return Response()


def get(request):
    try:
        # Check if the path is a file or folder.
        #path = request.path_info[5:].lower()
        request_path_segments = request.path_info.lower().split('/')

        # just remove '/api/docs/'
        requested_file = '/'.join(request_path_segments[3:])

        path = os.path.join(*(
            'docs',
            requested_file))

        logger.debug('Docs get on path %s', path)

        requested_file_segments = requested_file.split('/')
        library_name = requested_file_segments[0] if len(requested_file_segments) > 0 else ''
        version = requested_file_segments[1] if len(requested_file_segments) > 1 else ''
        file_path = '/'.join(requested_file_segments[2:])

        library_path = os.path.join(*(
            'docs',
            library_name))


        s3_conf = {
            'aws_access_key_id': settings.AWS_ACCESS_KEY_ID,
            'aws_secret_access_key': settings.AWS_SECRET_ACCESS_KEY
        }

        s3_resource = boto3.resource('s3', **s3_conf)
        bucket_name = settings.AWS_STORAGE_BUCKET_NAME
        bucket = s3_resource.Bucket(bucket_name)

        if version == 'latest':
            all_versions_paths = get_filtered_result(bucket_name, library_path + "/")
            all_versions = [s.strip(library_path) for s in all_versions_paths]
            latest_version = '0.0.0'

            if len(all_versions) > 1:
                for a, b in itertools.combinations(all_versions, 2):
                    highest_version = semver.max_ver(a, b)

                    if highest_version > latest_version:
                        latest_version = highest_version
            else:
                latest_version = all_versions[0]

            latest_file_pointer = os.path.join(*(
                library_path,
                latest_version,
                file_path))
            path = latest_file_pointer

        if re.match(r'[\w,\s\S]+\.[A-Za-z]{2,4}$', path):
            obj = s3_resource.Object(settings.AWS_STORAGE_BUCKET_NAME, path)

            # load() does a HEAD request for a single key,
            # which is fast, even if the object in question
            # is large or you have many objects in the bucket.
            obj.load()

            content = obj.get()['Body'].read()

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
                    content.decode('utf-8'), output_format='html5')

                return HttpResponse(content=content)
            elif path.endswith('.png'):
                return HttpResponse(content=content, content_type="image/png")
            elif path.endswith('.jpeg'):
                return HttpResponse(content=content, content_type="image/jpeg")
            else:
                return HttpResponse(content=content)
        else:
            filtered_result = get_filtered_result(bucket_name, path)
            return Response({'files': filtered_result})

    except botocore.exceptions.ClientError as exc:
        resp = exc.response

        return Response({
            'error': {
                'code': resp['Error']['Code'],
                'message': resp['Error']['Message']
            }}, status=status.HTTP_400_BAD_REQUEST)

