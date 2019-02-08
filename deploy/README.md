# Deploy to ElasticBeanstalk

For an explicit implementation with improved control, we generate our own app bundle for deploy to ElasticBeanstalk. See [Makefile](../Makefile), [deploy/build.sh](./build.sh), and [deploy/deploy.sh](./deploy.sh).

To use a custom app bundle, the following configuration is required in `.elasticbneanstalk/config.yml`:

```yaml
deploy:
  artifact: build.zip
```
