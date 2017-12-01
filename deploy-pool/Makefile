build_prod :
	cd src/web && npm install && npm run build

# Pool deploy.
# 1. Export and set vars manually . ./scripts/predeploy_env_vars.sh.
# 2. Build client.
# 3. Update the config files, urls.py, etc...
# 4. Build and push new images.  This also needs to be versioned properly 
#    as the pool will not re-pull an existing image automatically.
# 5. Stop and re-create the swarm services (nginx and backend).
# 6. Update the swarm nginx config, and restart.
deploy: build_prod
	. scripts/build_push_images.sh && \
	. scripts/pull_images.sh && \
	. scripts/delete_services.sh && \
	. scripts/create_services.sh && \
	. scripts/post_deploy.sh
