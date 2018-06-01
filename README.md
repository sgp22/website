# Documentation site

## Basic local dev setup

```bash
. ./scripts/set_dev_vars.sh
make up
make syncdb
make run_dev
```

And finally, `make shell_backend` and `chown uwsgi:uwsgi -R /home/app/media/`, if you are working with media files locally.

If you want to connect to S3 for read and write make sure the environment is done and run the below exports.

```bash
export AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
export S3_STORAGE=<S3_STORAGE>

# Ror local development its "elasticsearch".
export ES_HOST=elasticsearch
```

## Generate a certificate for prod

- Stop nginx first.
- `sudo certbot certonly -d design.infor.com`
- `sudo certbot certonly -d staging.design.infor.com`

- To renew.
- `sudo certbot renew`

- Crontab for auto renew.
- `crontab -e`
- `0 1 * * 4 /usr/local/bin/cert_renew.sh >> /var/log/cronjob.log 2>&1`
