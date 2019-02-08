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

if ! [[ "$EB_ENV" =~ ^(staging-a|prod)$ ]]; then
    echo "${RED}ERROR: $EB_ENV is not a valid deployment environment!${RESET}"
	exit 1
fi

echo "${CYAN}Deploying to elasticbeanstalk...${RESET}"
eb use ids-com-${EB_ENV}
eb deploy --staged

if [ $? -eq 0 ]; then
    echo "${GREEN}Successfully deployed ${EB_ENV}!${RESET}"
else
	echo "${RED}ERROR: deploy to elasticbeanstalk failed with error $?!${RESET}"
fi

rm -r build.zip
rm -r build/
