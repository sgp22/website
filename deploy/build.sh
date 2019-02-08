#!/bin/bash

RESET=`tput sgr0`
BLACK=`tput setaf 0`
RED=`tput setaf 1`
GREEN=`tput setaf 2`
YELLOW=`tput setaf 3`
BLUE=`tput setaf 4`
MAGENTA=`tput setaf 5`
CYAN=`tput setaf 6`
WHITE=`tput setaf 7`

while getopts "e:" opt; do
    case $opt in
        e)
            # the branch or tag name to build from
            EB_ENV="${OPTARG}"
            ;;
        *)
            exit 1
            ;;
    esac
done

if ! [[ "$EB_ENV" =~ ^(staging|prod)$ ]]; then
    echo "${RED}ERROR: $EB_ENV is not a valid deployment environment!${RESET}"
	exit 1
fi

if [[ "$EB_ENV" == "staging" ]];then
    echo "${BLACK}Generating build for ${BLUE}$EB_ENV${BLACK}...${RESET}"
else
    echo "${BLACK}Generating build for ${MAGENTA}$EB_ENV${BLACK}...${RESET}"
fi

# Set up build dir
echo "${CYAN}Setting up build directory...${RESET}"
mkdir -p build \
    build/.ebextensions \
    build/scripts \
    build/src/app \
    build/src/config \
    build/src/site
echo "${GREEN}...done${RESET}"

# Copy assets into build dir
echo "${CYAN}Copying assets into build...${RESET}"
# use \cp to avoid local alias to cp -i
\cp -fr src/app build/src && \
    cp -fr src/config build/src && \
    cp -fr src/site/dist build/src/site && \
    cp deploy/extensions/* build/.ebextensions/ && \
    cp deploy/scripts/cert_renew.sh build/scripts/ && \
    cp deploy/environments/$EB_ENV-Dockerrun.aws.json build/Dockerrun.aws.json
if [ $? -gt 0 ]; then
    echo "${RED}Error compiling build!${RESET}"
    exit 1
else
    echo "${GREEN}...done${RESET}"
fi

# cd into build directory to ommit parent dir
echo "${CYAN}Zipping up build...${RESET}"
cd build && \
    zip -q ../build.zip -r * .[^.]*
if [ $? -gt 0 ]; then
    echo "${RED}Error zipping build!${RESET}"
    exit 1
else
    echo "${GREEN}...done${RESET}"
fi
