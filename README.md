# Documentation site

## Local dev setup

```bash
export AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
export AWS_STORAGE_BUCKET_NAME=<AWS_STORAGE_BUCKET_NAME> Usually hl-docs-site-dev for dev.
export S3_STORAGE=<S3_STORAGE>  True or False.  Usually false for local dev, its quicker.
```

For data seeding.

```bash
export SOURCE_DB_HOST=<SOURCE_DB_HOST>
export SOURCE_DB_USER=<SOURCE_DB_USER>
export SOURCE_DB_PASS=<SOURCE_DB_PASS>
export SOURCE_DB=<SOURCE_DB> Usually postgres.

export TARGET_DB_HOST=172.17.0.1
```

- `. ./scripts/set_dev_vars.sh`
- `make up`
- ..or.. `make dev_backend` to run the application in dev mode on port 9002.

## For migrating data to local dev, from the pool server

Keep in mind that this will wipe your local database and recreate it exactly how it is on the server you are pointing to.

- The project needs to be up and running locally.
- `make shell_backend` and `chown uwsgi:uwsgi -R /home/app/media/`.
- `make syncdb`
- Log into the CMS admin and make sure the default site is created.

To get updated image files into your local environment, [follow the instructions](https://github.com/infor-design/design.infor.com/pull/275#issuecomment-359069520). Note that the contents will be outdated since that's just a static zip, but it'll get you started.
