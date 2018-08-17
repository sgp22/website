#!/bin/bash

set -u
set -e


NGINX_CONTAINER_NAME=${1:-"nginx"}
NGINX_CONTAINER=$(sudo docker ps -q --filter "name=$NGINX_CONTAINER_NAME")


sudo docker exec ${NGINX_CONTAINER} /bin/bash -c 'supervisorctl stop nginx \
    && certbot renew \
    && supervisorctl start nginx'

echo "[info] `date +%Y-%m-%d:%H:%M:%S`: seems the certificate renewed successfully"
