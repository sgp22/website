#!/bin/bash

set -e

API_USER=hookandloop
API_PASS=hookandloop
SWARM_URL=http://usalvlhlpool1.infor.com/swarmproxy
BACKEND_VERSION_ON_POOL=1.0.0
NGINX_VERSION_ON_POOL=1.0.0
BACKEND_POOL_CONTAINER=docs_backend_pool
NGINX_POOL_CONTAINER=docs_nginx_pool

BODY_PULL_NGINX_IMAGE=$(cat  << EOF
{
    "image_name": "docker.infor.com/hookandloop/$NGINX_POOL_CONTAINER",
    "image_version": "$NGINX_VERSION_ON_POOL"
}
EOF
)

BODY_PULL_BACKEND_IMAGE=$(cat  << EOF
{
    "image_name": "docker.infor.com/hookandloop/$BACKEND_POOL_CONTAINER",
    "image_version": "$BACKEND_VERSION_ON_POOL"
}
EOF
)

function pull_nginx_image {
    {
        curl -X POST -H "Content-Type: application/json" \
            -u $API_USER:$API_PASS \
            $SWARM_URL/pull_image/ \
            -d "$BODY_PULL_NGINX_IMAGE"
    } || {
        printf "\n"
        printf "Something went wrong with curl delete request.\n"
    }
}

function pull_backend_image {
    {
        curl -X POST -H "Content-Type: application/json" \
            -u $API_USER:$API_PASS \
            $SWARM_URL/pull_image/ \
            -d "$BODY_PULL_BACKEND_IMAGE"
    } || {
        printf "\n"
        printf "Something went wrong with curl delete request.\n"
    }
}

pull_nginx_image
pull_backend_image
