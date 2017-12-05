#!/bin/bash

set -e

API_USER=hookandloop
API_PASS=hookandloop
SWARM_URL=http://usalvlhlpool1.infor.com/swarmproxy


BODY_NGINX_DELETE=$(cat  << EOF
{
    "name": "docs"
}
EOF
)


BODY_BACKEND_DELETE=$(cat  << EOF
{
    "name": "backend"
}
EOF
)


function delete_service {
    {
        BODY=$1
        curl -X DELETE -H "Content-Type: application/json" \
            -u $API_USER:$API_PASS \
            $SWARM_URL/rm_service/ \
            -d "$BODY"
    } || {
        printf "\n"
        printf "Something went wrong with curl delete request.\n"
    }
}


delete_service "$BODY_NGINX_DELETE"
delete_service "$BODY_BACKEND_DELETE"
