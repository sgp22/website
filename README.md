# Documentation site

## Local dev setup

```
export AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
export AWS_STORAGE_BUCKET_NAME=<AWS_STORAGE_BUCKET_NAME> Usually hl-docs-site-dev for dev.
export S3_STORAGE=<S3_STORAGE>  True or False.
```
- `. ./scripts/set_dev_vars.sh`
- `make up`
- ..or.. `make dev_backend` to run the application in dev mode on port 9002.
