#!/bin/bash

set -e

API_USER=hookandloop
API_PASS=hookandloop
SWARM_URL=http://usalvlhlpool1.infor.com/swarmproxy
BACKEND_VERSION_ON_POOL=1.0.0
NGINX_VERSION_ON_POOL=1.0.0


BODY_NGINX_CREATE=$(cat  << EOF
{
	"image": "docker.infor.com/hookandloop/docs_nginx_pool:$NGINX_VERSION_ON_POOL",
	"endpoint_spec": {
		"ports": "{1001:80}"
	},
	"kwargs": {
		"name": "docs",
		"networks": ["soho-pool"],
		"container_labels": {
			"nginx_proxy_path": "docs/docs",
			"endpoint": "docs"
		},
		"mounts": [
			"docs-staging-static-data:/home/app/static/:rw",
			"docs-staging-media-data:/home/app/media/:rw"
		]
	}
}
EOF
)


BODY_BACKEND_CREATE=$(cat  << EOF
{
    "image": "docker.infor.com/hookandloop/docs_backend_pool:$BACKEND_VERSION_ON_POOL",
	"endpoint_spec": {
		"ports": "{1002:9002,1003:9003}"
	},
	"kwargs": {
		"name": "backend",
		"networks": ["soho-pool"],
		"mounts": [
			"docs-staging-static-data:/home/app/static/:rw",
			"docs-staging-media-data:/home/app/media/:rw"
		]
	}
}
EOF
)


function create_service () {
    {
        BODY=$1
        curl -X POST -H "Content-Type: application/json" \
            -u $API_USER:$API_PASS \
            $SWARM_URL/create_swarm_service/ \
            -d "$BODY"
    } || {
        printf "\n"
        printf "Something went wrong with curl create request.\n"
    }
}


create_service "$BODY_NGINX_CREATE"
create_service "$BODY_BACKEND_CREATE"
