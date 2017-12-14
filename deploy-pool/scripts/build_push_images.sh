#!/bin/bash

set -e

ORG=hookandloop
REGISTRY=docker.infor.com
BACKEND_VERSION=1.0.2
NGINX_VERSION=1.0.0
BACKEND_VERSION_ON_POOL=1.0.0
NGINX_VERSION_ON_POOL=1.0.0
BACKEND_POOL_CONTAINER=docs_backend_pool
NGINX_POOL_CONTAINER=docs_nginx_pool

# These are public so no auth is required
docker pull hookandloop/docs-backend:$BACKEND_VERSION
docker pull hookandloop/docs-nginx:$NGINX_VERSION

# Create the backend Dockerfile
printf "
FROM hookandloop/docs-backend:$BACKEND_VERSION
MAINTAINER Hook & Loop Dev <hookandloopjenkins@gmail.com>\n

ENV DJANGO_URL_PATH $DJANGO_URL_PATH\n
ENV ROOT_URL_PATH $ROOT_URL_PATH\n
ADD ./src/app /home/app\n
ADD ./src/config /home/config\n
ADD ./src/config/supervisor/backend.conf /etc/supervisor/conf.d/backend.conf\n" > Dockerfile

# Build and push container
docker build -t $REGISTRY/$ORG/$BACKEND_POOL_CONTAINER:$BACKEND_VERSION_ON_POOL -f ./Dockerfile .
docker push $REGISTRY/$ORG/$BACKEND_POOL_CONTAINER:$BACKEND_VERSION_ON_POOL

rm Dockerfile

# Create the nginx Dockerfile
printf "
FROM hookandloop/docs-nginx:$NGINX_VERSION
MAINTAINER Hook & Loop Dev <hookandloopjenkins@gmail.com>\n

ADD ./src/web /home/web\n
ADD ./src/config /home/config\n
ADD ./src/config/supervisor/webserver.conf /etc/supervisor/conf.d/webserver.conf\n
ADD ./src/config/nginx/nginx.conf /etc/nginx/nginx.conf\n
ADD ./src/config/nginx/frontend.conf /etc/nginx/sites-available/default" > Dockerfile

# Build and push nginx container
docker build -t $REGISTRY/$ORG/$NGINX_POOL_CONTAINER:$NGINX_VERSION_ON_POOL -f ./Dockerfile .
docker push $REGISTRY/$ORG/$NGINX_POOL_CONTAINER:$NGINX_VERSION_ON_POOL

rm Dockerfile
