#!/bin/bash


# Escape the forward slashes or else the build script will fail.
# Everything here is backend related, nothing for the Angular client.
export NGINX_PATH="\/"$ROOT_URL_PATH"\/"
export DJANGO_URL_PATH=$ROOT_URL_PATH"\/"