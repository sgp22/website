#!/bin/bash

while getopts "e:" opt; do
    case $opt in
        e)
            # EB env to deploy to; staging or prod
            EB_ENV="${OPTARG}"
            ;;
        *)
            exit 1
            ;;
    esac
done

if [[ "$EB_ENV" == "staging" ]]; then

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

elif [[ "$EB_ENV" == "prod" ]]; then

    eb setenv AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" \
        AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
        AWS_STORAGE_BUCKET_NAME="ids-com" \
        DJANGO_SETTINGS_MODULE="app.settings.prod" \
        DB_NAME="$DB_NAME" \
        DB_USER="$DB_USER" \
        DB_HOST="$DB_HOST" \
        DB_PASS="$DB_PASS" \
        RDS_TRUE="False" \
        S3_STORAGE="True" \
        DOCS_API_KEY="$DOCS_API_KEY" \
        ES_HOST="$ES_HOST" \
        ES_INDEX_PREFIX="$ES_INDEX_PREFIX" \
        ES_SECURE="$ES_SECURE" \
        ES_PORT="$ES_PORT"

fi
