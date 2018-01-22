# Docker settings
ENVS = -e SOURCE_DB_HOST=$(SOURCE_DB_HOST) -e TARGET_DB_HOST=$(TARGET_DB_HOST)
NAMESPACE = hookandloop
CONTAINER = docs-migrate-postgres

.PHONY: run

syncdb : rm run tail

build :
	docker build -t $(NAMESPACE)/$(CONTAINER) .

run :
	docker run --name $(CONTAINER) -i -d $(ENVS) -t $(NAMESPACE)/$(CONTAINER)

rm :
	-docker kill $(CONTAINER)
	-docker rm $(CONTAINER)

bash:
	docker exec -ti $(CONTAINER) /bin/bash

tail:
	docker logs -f $(CONTAINER)
