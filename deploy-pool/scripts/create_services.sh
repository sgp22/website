#!/bin/bash

set -e

API_USER=hookandloop
API_PASS=hookandloop
SWARM_URL=http://usalvlhlpool1.infor.com/swarmproxy
NETWORK="soho-pool"
NGINX_VER="1.0.0"

BODY_NGINX_CREATE=$(cat  << EOF
{
    "name": "docs",
    "network: "soho-pool",
    "label: "nginx_proxy_path=docs/docs",
    "label: "endpoint=docs",
    "mount: "type=volume,src=docs-staging-static-data,dst=/home/app/static/",
    "mount: "type=volume,src=docs-staging-media-data,dst=/home/app/media/",
    "publish: "80",
    "image": "docker.infor.com/hookandloop/docs_nginx_pool:$NGINX_VER"
}
EOF
)

BODY_NGINX_DELETE=$(cat  << EOF
{
    "name": "docs"
}
EOF
)

function delete_nginx_service {
    {
        curl -X DELETE -H "Content-Type: application/json" \
            -u $API_USER:$API_PASS \
            $SWARM_URL/rm_service/ \
            -d "$BODY_NGINX_DELETE"
    } || {
        printf "\n"
        printf "Something went wrong with curl delete request.\n"
    }
}

# This cant happen yet as the swarmproxy create_service
# is not configured properly. 
# http://git.infor.com/projects/HL/repos/hl-swarmproxy/browse/src/swarmproxy/server.py
function create_service {
    {
        curl -X POST -H "Content-Type: application/json" \
            -u $API_USER:$API_PASS \
            $SWARM_URL/create_service/ \
            -d "$BODY_NGINX_CREATE"
    } || {
        printf "\n"
        printf "Something went wrong with curl create request.\n"
    }
}

delete_nginx_service
