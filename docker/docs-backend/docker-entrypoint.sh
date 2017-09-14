#!/bin/bash

set -e

if [[ -z "${RDS_TRUE}" ]]; then
    echo "Waiting for Postgres..."

    while ! pg_isready -h "postgres" -p "5432" > /dev/null 2> /dev/null; do
        echo "Connecting to postgres Failed"
        sleep 1
    done

    >&2 echo "Postgres is up - executing command"
fi

export PYTHONPATH=$PYTHONPATH:/app/app


python3 /home/app/manage.py collectstatic --noinput && \
	python3 /home/app/manage.py makemigrations && \
	echo yes | python3 /home/app/manage.py migrate

chmod g+w -R /var/log/

rm -rf /tmp/uwsgi && \
	mkdir -p /tmp/uwsgi && \
	ln -s /home/config/uwsgi/uwsgi.ini /tmp/uwsgi/

/usr/bin/supervisord -n -c /etc/supervisor/supervisord.conf

exec "$@"
