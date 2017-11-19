#!/bin/bash

# When setting this variable, make sure to escape 
# the forward slashes or else the build script will fail.
# For example, if the path is just /, then the var will
# be "\/".
export URL_PATH="docs"
export NGINX_PATH="\/"$URL_PATH"\/"
