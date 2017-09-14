#!/bin/bash

set -e

/usr/bin/supervisord -n -c /etc/supervisor/supervisord.conf

exec "$@"
