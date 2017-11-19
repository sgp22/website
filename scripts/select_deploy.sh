#!/bin/bash

# Immediately stop the 
# script if a command fails.
set -e

while [[ $# -gt 1 ]]
do
key="$1"

case $key in
    -f|--folder)
    SOURCEFOLDER="$2"
    shift
    ;;
    -c|--command)
    MAKECOMMAND="$2"
    shift
    ;;
    *)
    ;;
esac
shift
done

if [ -z ${SOURCEFOLDER} ]; then
    echo "Source folder is unset";
    return
fi

if [ -z ${MAKECOMMAND} ]; then
    echo "Make command is unset";
    return
fi

NGINX_PATH=$(env | grep -w "NGINX_PATH" | grep -oe '[^=]*$' || true);
ROOTDIR="$( cd "$(dirname `dirname "${BASH_SOURCE[0]}"` )" && pwd )"
DIRECTORY="${ROOTDIR}/${SOURCEFOLDER}"
NGINX_CONFIG_FILE_PATH="$ROOTDIR/src/config/nginx/frontend.conf"
RED='\033[0;31m'
NC='\033[0m'
ERROR_STR=${RED}Error${NC}: 

if [ ! -d ${DIRECTORY} ]; then
    echo "Directory not found";
    return
fi

# copy all stuff from source dir to the root except of readme
rsync -a "${DIRECTORY}/" ${ROOTDIR} --exclude=README.md

if [ -e "$NGINX_CONFIG_FILE_PATH" ] && [ -n "$NGINX_PATH" ]; then
    {
        sed -i '' -e "s/<NGINX_PATH>/$NGINX_PATH/g" "$NGINX_CONFIG_FILE_PATH"
    } || { # catch
        printf "$ERROR_STR Something is wrong with the sed command, make sure your NGINX_PATH var is properly set.\n"
    }
else
    printf "$ERROR_STR NGINX_PATH var is not set or nginx config file does not exist...\n"
fi

# run make command
make -f "${ROOTDIR}/Makefile" ${MAKECOMMAND}

curl -X POST -u admin:n98Y-uhPb-llGa-LdUl http://usalvlhlpool1/swarm/update_config
curl -X POST -u admin:n98Y-uhPb-llGa-LdUl http://usalvlhlpool1/swarm/reload_nginx

# revert the state of the directories
declare -a to_delete=("${ROOTDIR}/Dockerrun.aws.json"
                "${ROOTDIR}/scripts/predeploy_env_vars.sh"
                "${ROOTDIR}/scripts/create_services.sh"
                "${ROOTDIR}/scripts/build_push_images.sh"
                )

for i in "${to_delete[@]}"
do
   rm -f "$i"
done

git fetch
git checkout src/config Makefile

exec bash
