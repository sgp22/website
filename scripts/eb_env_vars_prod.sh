#!/bin/bash


eb setenv AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" \
    AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
    AWS_STORAGE_BUCKET_NAME="ids-com" \
    DJANGO_SETTINGS_MODULE="app.settings.prod" \
    DB_NAME="$DB_NAME" \
    DB_USER="$DB_USER" \
    DB_HOST="$DB_HOST" \
    DB_PASS="$DB_PASS" \
    RDS_TRUE="False" \
    S3_STORAGE="True"
