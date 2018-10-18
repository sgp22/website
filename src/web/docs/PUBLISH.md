# IDS Website Deploy

## Prequistie

### Set up `eb`

Run: `brew install eb`
Within repo, run `eb init` and follow prompts to enter below data:

```sh
aws_access_key_id = {YOUR ACCESS KEY ID}
aws_secret_access_key = {YOUR SECRET ACCESS KEY}
region = us-east-1
application to use: design-system
default environment: ids-com-prod
```

You'll be deploying based on the branch you're on. So if you're deploying to prod, make sure you're on master and that you've pulled the latest changes.
The script will run a build, so the state of your local build doesn't matter.

## Deploying

### Staging

In the repo, make sure you're clean and everything you've changed is committed.
Then run:

```sh
mv deploy/staging-Dockerrun.aws.json deploy/Dockerrun.aws.json
export DOMAIN=https://staging.design.infor.com
export ENV=staging
bash ./scripts/select_deploy.sh -f deploy -c deploy_staging
mv deploy/Dockerrun.aws.json deploy/staging-Dockerrun.aws.json
```

You might be dumped into a different bash prompt after. If so, just run `exit`.

### Production

Run:

```SH
mv deploy/prod-Dockerrun.aws.json deploy/Dockerrun.aws.json
export DOMAIN=https://design.infor.com
export ENV=production
bash ./scripts/select_deploy.sh -f deploy -c deploy_prod
mv deploy/Dockerrun.aws.json deploy/prod-Dockerrun.aws.json
```

You might be dumped into a different bash prompt after. If so, just run `exit`.

### Updating ENV vars on production

This isn't needed very often but if you're making a change to the site code which requires a new env var on the server, this is how you push a new var.
Set vars locally using `export` and then run:

```sh
eb use ids-com-prod && zsh deploy/scripts/eb_env_vars_prod.sh
```

## Jenkins Tasks

<http://jenkins.design.infor.com:8080/>

### Enterprise Demo App deploy

1. Go to [soho4-swarm-deploy](http://jenkins.design.infor.com:8080/job/soho4-swarm-deploy/build?delay=0sec)
1. Set `BUILD_FROM` to the branch/tag you want
1. Click Build

Master deploys on it’s own, so you’d only really need to deploy:

- For QA builds
- On release (which we can script)
- On special occasions where you need to demo a branch before it’s into master

### Prod Backup (scheduled and added to cron)

<http://jenkins.design.infor.com:8080/job/postgres-db-backup/>

This task backs up the prod database to AWS S3.

1. Click "Build with Parameters"
1. Enter in the parameters from below:

    ```text
    DB_HOST : {IP}
    DB_USER : {USER}
    DB_PASS : {PASSWORD}
    DB_NAME : {DB_NAME}
    FILENAME_PREFIX : ids
    AWS_BUCKET_NAME : ids-com-backups
    ```

1. Click "Build"

Once a build has been queued, you can see it in the list.
Click on the build and then click "Console Output" to see the task running.
If the backup task is successful, you'll need the filename it generates in the next step to restore that backup to staging.

### Restore Prod to Stage

```text
DB_HOST : {IP}
DB_USER : {USER}
DB_PASS : {PASSWORD}
DB_NAME : {DB_NAME}
FILE_NAME : <OUTPUT FROM DUMP>
AWS_BUCKET_NAME : ids-com-backups
```
