# Documentation site

## Local dev setup

```bash
export AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
export AWS_STORAGE_BUCKET_NAME=<AWS_STORAGE_BUCKET_NAME> Usually hl-docs-site-dev for dev.
export S3_STORAGE=<S3_STORAGE>  True or False.
```

- `. ./scripts/set_dev_vars.sh`
- `make up`
- ..or.. `make dev_backend` to run the application in dev mode on port 9002.

## For migrating data to local dev, from the pool server

Keep in mind that this will wipe your local database and recreate it exactly how it is on the pool server.

- The project needs to be up and running locally.
- `make syncdb`

To get updated image files into your local environment, [follow the instructions](https://github.com/infor-design/design.infor.com/pull/275#issuecomment-359069520). Note that the contents will be outdated since that's just a static zip, but it'll get you started.
