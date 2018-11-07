#!/bin/bash


eb setenv AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" \
    AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
    AWS_STORAGE_BUCKET_NAME="ids-com-staging" \
    DJANGO_SETTINGS_MODULE="app.settings.staging" \
    RDS_TRUE="False" \
    S3_STORAGE="True" \
    DOCS_API_KEY="$DOCS_API_KEY" \
    ES_HOST="$ES_HOST" \
    ES_INDEX_PREFIX="$ES_INDEX_PREFIX" \
    ES_SECURE="$ES_SECURE" \
    ES_PORT="$ES_PORT"