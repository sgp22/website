build_prod :
	cd src/web && npm install && npm run build

# Pool deploy.
# 1. Make sure env variables are set,  NGINX_PATH, PATH. Also the versions. TODO: Read the PATH var for urls.py.
# 2. Build client.
# 3. Update the config files, urls.py, etc...
# 4. Build and push new images.  This also needs to be versioned properly 
#    as the pool will not re-pull an existing image automatically.
# 5. Stop and re-create the swarm services (nginx and backend).  TODO: Fix hl-swarmproxy.
# 6. Update the swarm nginx config, and restart.
deploy_pool: build_prod
	. scripts/build_push_images.sh
