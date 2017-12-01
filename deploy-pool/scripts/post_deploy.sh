#!/bin/bash

# Waiting for 20 seconds to the swarm service
# a little bit of time to start the container.
#
# TODO: Check if the service is running and then
#       update nginx config.
sleep 20

# Reload nginx config.
curl -X POST -u admin:n98Y-uhPb-llGa-LdUl http://usalvlhlpool1/swarm/update_config
curl -X POST -u admin:n98Y-uhPb-llGa-LdUl http://usalvlhlpool1/swarm/reload_nginx
