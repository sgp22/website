# Documentation site

## Basic local dev setup

If you want to connect to S3 to same wagtail media, and uploaded docs, run the below exports.  Notice the `export S3_STORAGE=True`, if you want to upload to the local host, then set it to `False`.

```bash
export AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
export AWS_STORAGE_BUCKET_NAME=ids-com-dev
export S3_STORAGE=True
export ES_HOST=elasticsearch
export ES_INDEX_PREFIX=dev
export DOCS_API_KEY=<DOCS_API_KEY>
```

then...

```bash
. ./scripts/set_dev_vars.sh
make up
make syncdb
make run_dev #for frontend dev
make dev_backend #for backend dev
```

And finally, `make shell_backend` and `chown uwsgi:uwsgi -R /home/app/media/`, if you are working with media files locally.

## Generate a certificate for prod

- Stop nginx first.
- `sudo certbot certonly -d design.infor.com`
- `sudo certbot certonly -d staging.design.infor.com`

- To renew.
- `sudo certbot renew`

- Crontab for auto renew.
- `crontab -e`
- `0 1 * * 4 /usr/local/bin/cert_renew.sh >> /var/log/cronjob.log 2>&1`
