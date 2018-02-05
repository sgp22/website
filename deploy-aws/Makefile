build_prod :
	cd src/web && npm install && npm run build:prod

# ElasticBeanstalk
setup_vars_staging :
	. eb_env_vars_prod.sh

setup_vars_prod :
	. eb_env_vars_staging.sh

deploy_staging : build_prod
	eb use ids-com-staging && \
	. scripts/eb_deploy.sh

deploy_prod : build_prod
	eb use ids-com-prod && \
	. scripts/eb_deploy.sh
