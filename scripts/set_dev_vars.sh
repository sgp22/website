#!/bin/bash


# Default env var state.
export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
export AWS_STORAGE_BUCKET_NAME="$AWS_STORAGE_BUCKET_NAME"

# TODO: On initial deploy, will throw:
#       PermissionError at /admin/images/1/
#       [Errno 13] Permission denied: '/home/app/media/original_images'
#       If its set to False
#       Need to set proper permissions to the volumes.
export S3_STORAGE=$S3_STORAGE

export DEBUG="True"
export ROOT_URL_PATH=""
export ENV=""
export DOMAIN=""
export DOMAIN_VERSION="v2"
export DOMAIN_DOCS_API="http://docs-site-bucket.us-east-1.elasticbeanstalk.com/api/docs"
