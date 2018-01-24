build_prod :
	cd src/web && npm install && npm run build:prod

# ElasticBeanstalk
setup :
	. scripts/eb_env_vars.sh

deploy : build_prod
	eb use ids-com-staging && \
	. scripts/eb_deploy.sh
