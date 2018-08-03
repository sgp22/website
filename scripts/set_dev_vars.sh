#!/bin/bash


# Default env var state.
export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY

# TODO: On initial deploy, will throw:
#       PermissionError at /admin/images/1/
#       [Errno 13] Permission denied: '/home/app/media/original_images'
#       If its set to False
#       Need to set proper permissions to the volumes.
export S3_STORAGE=$S3_STORAGE
export AWS_STORAGE_BUCKET_NAME=$AWS_STORAGE_BUCKET_NAME

export DEBUG="True"
export ENV=""
export DOMAIN=""
export DOMAIN_VERSION="v2"
export DOMAIN_DOCS_API=""
export DOCS_API_KEY=$DOCS_API_KEY


export ES_INDEX_PREFIX=$ES_INDEX_PREFIX
export ES_HOST=$ES_HOST
