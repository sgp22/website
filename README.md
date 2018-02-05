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
export AWS_STORAGE_BUCKET_NAME=<AWS_STORAGE_BUCKET_NAME>
export S3_STORAGE=<S3_STORAGE>
```

## Generate a certificate for prod

- stop nginx first
- `sudo certbot certonly -d design.infor.com`
- `sudo certbot certonly -d staging.design.infor.com`