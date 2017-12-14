build_prod :
	cd src/web && npm install && npm run build:prod

# Pool deploy.
deploy: build_prod
	. scripts/build_push_images.sh && \
	. scripts/pull_images.sh && \
	. scripts/delete_services.sh && \
	. scripts/create_services.sh && \
	. scripts/post_deploy.sh
