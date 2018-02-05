#!/bin/bash


eb setenv AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" \
    AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
    AWS_STORAGE_BUCKET_NAME="ids-com-staging" \
    DJANGO_SETTINGS_MODULE="app.settings.dev" \
    RDS_TRUE="False" \
    S3_STORAGE="True"
