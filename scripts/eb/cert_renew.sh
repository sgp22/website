#!/bin/bash

set -e

supervisorctl stop nginx
certbot renew
supervisorctl start nginx
