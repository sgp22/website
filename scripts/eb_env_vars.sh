#!/bin/bash


eb setenv AWS_S3_ACCESS_KEY_ID="$AWS_S3_ACCESS_KEY_ID" \
    AWS_S3_SECRET_ACCESS_KEY="$AWS_S3_SECRET_ACCESS_KEY" \
    AWS_STORAGE_BUCKET_NAME="docs-media" \
    DEBUG="False" \
    RDS_TRUE="True"
