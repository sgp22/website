# Deploy steps to ElasticBeanstalk (staging)

```bash
export AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
export AWS_STORAGE_BUCKET_NAME=<AWS_STORAGE_BUCKET_NAME>
export DOMAIN=<DOMAIN>
export ENV=production
```

- `. ./deploy/aws/scripts/predeploy_env_vars.sh`
- Pool `. ./scripts/select_deploy.sh -f deploy -c deploy`
