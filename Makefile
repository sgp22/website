NGINX_CONTAINER=docssite_nginx
BACKEND_CONTAINER=docssite_backend
POSTGRES_CONTAINER=docssite_postgres
SOURCE_DB_HOST=35.168.252.1
TARGET_DB_HOST=172.17.0.1
ES_HTTP_PREFIX=http://

ifeq ($(ES_SECURE),True)
    ES_HTTP_PREFIX=https://
else
    ES_HTTP_PREFIX=http://
endif

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
	-docker volume rm design_infor_com_static_data
	-docker volume rm design_infor_com_media_data
	-docker volume rm design_infor_com_postgres_data
	-docker volume rm design_infor_com_elasticsearch_data

restart :
	docker-compose restart

reset : down
	make up

migrate :
	docker exec -ti $(BACKEND_CONTAINER) sh -c "echo yes | python3 /home/app/manage.py migrate"

syncdb :
	cd docker/docs-migrate-postgres && \
		export SOURCE_DB_HOST=$(SOURCE_DB_HOST) && \
		export TARGET_DB_HOST=$(TARGET_DB_HOST) && \
		make syncdb

restart_vm :
	docker-machine restart


# Web
node_modules : src/web/package.json
	cd src/web && npm install
	touch $@

run_dev : node_modules
	cd src/web && npm run start

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

index_backend :
	docker exec -ti $(BACKEND_CONTAINER) python3 /home/app/manage.py update_index

index_s3 :
	docker exec -ti $(BACKEND_CONTAINER) python3 /home/app/index_s3.py \
		-bucket_name $(AWS_STORAGE_BUCKET_NAME) \
		-aws_access_key_id $(AWS_ACCESS_KEY_ID) \
		-aws_secret_access_key $(AWS_SECRET_ACCESS_KEY) \
		-es_index_prefix $(ES_INDEX_PREFIX) \
		-es_host $(ES_HTTP_PREFIX)$(ES_HOST) \
		-es_port $(ES_PORT)

build_backend :
	cd docker/docs-backend && \
		make build


# Postgres
shell_postgres :
	docker exec -ti $(POSTGRES_CONTAINER) /bin/bash

tail_postgres :
	docker logs -f $(POSTGRES_CONTAINER)

# Deploy

deploy_staging:
	export DOMAIN=https://staging.design.infor.com \
		&& export ENV=staging \
		&& mv deploy/staging-Dockerrun.aws.json deploy/Dockerrun.aws.json \
		&& bash ./scripts/select_deploy.sh -f deploy -c deploy_staging_a \
		&& mv deploy/Dockerrun.aws.json deploy/staging-Dockerrun.aws.json \

deploy_prod:
	export DOMAIN=https://design.infor.com \
		&& export ENV=prod \
		&& mv deploy/prod-Dockerrun.aws.json deploy/Dockerrun.aws.json \
		&& bash ./scripts/select_deploy.sh -f deploy -c deploy_prod \
		&& mv deploy/Dockerrun.aws.json deploy/prod-Dockerrun.aws.json
