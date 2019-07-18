# Makefile for docs-backend

ORGANIZATION = hookandloop
CONTAINER = docs-backend
VERSION = 1.1.3

.PHONY: build

build :
	docker build -t $(ORGANIZATION)/$(CONTAINER):$(VERSION) .

rebuild :
	docker build --no-cache -t $(ORGANIZATION)/$(CONTAINER):$(VERSION) .
