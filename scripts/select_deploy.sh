#!/bin/bash
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

if [ ! -d ${DIRECTORY} ]; then
    echo "Directory not found";
    return
fi

# copy all stuff from source dir to the root except of readme
rsync -a "${DIRECTORY}/" ${ROOTDIR} --exclude=README.md

sed -i '' -e "s/NGINX_PATH/$NGINX_PATH/g" "$ROOTDIR/src/config/nginx/frotnend.conf"

# run make command
#make -f "${ROOTDIR}/Makefile" ${MAKECOMMAND}

# revert the state of the directories
rm -f ${ROOTDIR}/Dockerrun.aws.json

#git checkout scripts src
