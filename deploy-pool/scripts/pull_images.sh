#!/bin/bash

set -e

API_USER=hookandloop
API_PASS=hookandloop
SWARM_URL=http://usalvlhlpool1.infor.com/swarmproxy
BACKEND_VERSION_ON_POOL=1.0.0
NGINX_VERSION_ON_POOL=1.0.0

BODY_PULL_NGINX_IMAGE=$(cat  << EOF
{
    "image_name": "docker.infor.com/hookandloop/docs_nginx_pool",
    "image_version": "$NGINX_VERSION_ON_POOL"
}
EOF
)

BODY_PULL_BACKEND_IMAGE=$(cat  << EOF
{
    "image_name": "docker.infor.com/hookandloop/docs_backend_pool",
    "image_version": "$BACKEND_VERSION_ON_POOL"
}
EOF
)


function pull_image () {
    {
        BODY=$1
        curl -X POST -H "Content-Type: application/json" \
            -u $API_USER:$API_PASS \
            $SWARM_URL/pull_image/ \
            -d "$BODY"
    } || {
        printf "\n"
        printf "Something went wrong with curl delete request.\n"
    }
}


pull_image "$BODY_PULL_NGINX_IMAGE"
pull_image "$BODY_PULL_BACKEND_IMAGE"
