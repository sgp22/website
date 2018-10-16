# Documentation site

## Basic local dev setup

If you want to connect to S3 to same wagtail media, and uploaded docs, run the below exports.  Notice the `export S3_STORAGE=True`, if you want to upload to the local host, then set it to `False`.

```bash
export AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
export AWS_STORAGE_BUCKET_NAME=ids-com-dev
export S3_STORAGE=True
export ES_HOST=elasticsearch
export ES_PASS=<ES_PASS>
export ES_INDEX_PREFIX=dev
export DOCS_API_KEY=<DOCS_API_KEY>
```

then...

```bash
. ./scripts/set_dev_vars.sh
make up
make syncdb
make migrate
make index_backend
make index_s3
make run_dev #for frontend dev
make dev_backend #for backend dev
```

And finally, `make shell_backend` and `chown uwsgi:uwsgi -R /home/app/media/`, if you are working with media files locally.

## Building backend

If you need to update python packages or make other changes to the docker image:

* Update [requirements.txt](https://github.com/infor-design/website/blob/master/src/app/requirements.txt) and/or [prod.txt](https://github.com/infor-design/website/blob/master/docker/docs-backend/requirements/prod.txt)
* Update references to `docs-backend` version number, as seen in this commit [`f8d57ba`](https://github.com/infor-design/website/commit/f8d57ba91a94607d835c84a712c31dcdd80b6a06)
* Then build and push the docker container as follows, getting the docker credentials from an admin:

```
make build_backend
docker login
docker push hookandloop/docs-backend:1.0.6
```
Make sure to update the `push` command with the version number you just created.

## ElasticSearch

To browse the indexes through the browser, navigate to here https://localhost:9200/_cat/indices?v

#### Some TODOs.

- Properly manage SSL certificates between the ES and backend container.
- Set our own username.
- Nightly ES index backup to S3.
- Securing the index that is currently deployed on the EC2 instance.  Which should be done after the above.

## Generate a certificate for prod

- Stop nginx first.
- `sudo certbot certonly -d design.infor.com`
- `sudo certbot certonly -d staging.design.infor.com`

- To renew.
- `sudo certbot renew`

- Crontab for auto renew every 12 hours.
- `crontab -e`
- `0 */24 * * * /usr/local/bin/cert_renew.sh >> /var/log/cronjob.log 2>&1`
