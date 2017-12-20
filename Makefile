NGINX_CONTAINER = docssite_nginx
BACKEND_CONTAINER = docssite_backend
POSTGRES_CONTAINER = docssite_postgres

.PHONY: up

validate :
	docker-compose config

build : validate
	docker-compose build

rm :
	docker rmi `docker images | awk "{print $3}"`

rm_exited :
	docker rm `docker ps -aqf status=exited`

rm_images_dangling :
	docker rmi `docker images --filter "dangling=true" -q --no-trunc`

pull :
	docker-compose pull

up : pull
	docker-compose up -d

up_local :
	docker-compose up -d --no-build

down :
	docker-compose down

down_clean : down
	-docker volume rm docssite_media-data
	-docker volume rm docssite_postgres-data
	-docker volume rm docssite_static-data

restart :
	docker-compose restart

reset : down
	make up

syncdb :
	cd config/migrate-postgres && \
		SOURCE_DB_HOST=$(SOURCE_DB_HOST) \
		SOURCE_DB_PASS=$(SOURCE_DB_PASS) \
		make syncdb

restart_vm :
	docker-machine restart


# Web
run_dev :
	cd src/web && npm install && npm run start

# This is mostly for testing locally.
build_prod :
	cd src/web && npm install && npm run build:prod


# Nginx
shell_nginx :
	docker exec -ti $(NGINX_CONTAINER) /bin/bash

tail_nginx :
	docker logs -f $(NGINX_CONTAINER)

build_nginx :
	cd docker/docs-nginx && \
		make build


# Backend
shell_backend :
	docker exec -ti $(BACKEND_CONTAINER) /bin/bash

tail_backend :
	docker logs -f $(BACKEND_CONTAINER)

tail_backend_python :
	docker exec -ti $(BACKEND_CONTAINER) tail -f /var/log/django.log

dev_backend :
	docker exec -ti $(BACKEND_CONTAINER) python3 /home/app/manage.py runserver 0.0.0.0:9002

build_backend :
	cd docker/docs-backend && \
		make build


# Postgres
shell_postgres :
	docker exec -ti $(POSTGRES_CONTAINER) /bin/bash

tail_postgres :
	docker logs -f $(POSTGRES_CONTAINER)
