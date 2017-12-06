#!/bin/bash


API_USER=hookandloop
API_PASS=hookandloop
SWARM_URL=http://usalvlhlpool1.infor.com/swarmproxy


# Waiting a bit to give the swarm time to remove the containers.
sleep 15

function try_curl {
    TRY_CURL=$(curl -Is -u $API_USER:$API_PASS --write-out %{http_code} --silent --output /dev/null $SWARM_URL/get_swarm_container_by_name/?container_name=docs)

    echo $TRY_CURL
}

CALL=$(try_curl)

while [ $CALL -ne 200 ]
do
    echo "Trying again in 5 seconds..."
    sleep 5
    CALL=$(try_curl)
done


# Reload nginx config.
curl -X POST -u admin:n98Y-uhPb-llGa-LdUl http://usalvlhlpool1/swarm/update_config
curl -X POST -u admin:n98Y-uhPb-llGa-LdUl http://usalvlhlpool1/swarm/reload_nginx
