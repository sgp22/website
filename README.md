# Documentation site

## Basic local dev setup

If you want to connect to S3 to save wagtail media, and uploaded docs, create an `.env` file in the 
root of the project and add the below snippet to it.  This file in not version controlled and is always
present so you do not need to constantly export vars.
Notice the `export S3_STORAGE=True`, if you want to upload to the local host, then set it to `False`.

```bash
AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
AWS_STORAGE_BUCKET_NAME=ids-com-dev
S3_STORAGE=True
ES_HOST=elasticsearch
ES_PASS=<ES_PASS>
ES_INDEX_PREFIX=dev
DOCS_API_KEY=<DOCS_API_KEY>
```

then...

```bash
source $PWD/.env
make up
make syncdb
make migrate
make index_backend
make index_s3
make dev_site #for frontend dev
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
