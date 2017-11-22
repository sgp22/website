# Deploy steps, to pool and AWS

- AWS

```shell
export AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
export DOMAIN=<DOMAIN>
export ENV=<ENV>
```

- Pool

```shell
export DOMAIN=<DOMAIN>
export ENV=<ENV>
export ROOT_URL_PATH=<ROOT_URL_PATH>
```

- `. ./deploy-pool/scripts/predeploy_env_vars.sh`
- Pool `. ./scripts/select_deploy.sh -f deploy-pool -c deploy`
- AWS `. ./scripts/select_deploy.sh -f deploy-aws -c deploy`

On a fresh setup on pool or prod we need to set permissions for the media folder.
TODO: Change the loose permissons and implement minio.

- `mkdir -p /home/app/media/`
- `chmod 777 -R /home/app/media/`

## Create Minio service

All services need to stay on the soho-pool network so hl-nginx-swarm service can see it

```shell
docker service create \
    --replicas 1 \
    --restart-condition any \
    --name minio \
    --network soho-pool \
    --mount type=bind,src=/u01/data/minio/config/minio1,dst=/root/.minio \
    --mount type=bind,src=/u01/data/minio/export/minio1,dst=/export \
    --env MINIO_ACCESS_KEY=AKIAIOSFODNN7SNJDUWH \
    --env MINIO_SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYJHSGYBCH \
    --env 9000:9000 \
    minio/minio \
    server /export
```

## Create the Postgres master service

```shell
docker service create \
    --name postgres \
    --network soho-pool \
    --mount type=volume,src=docs-staging-postgres-volume,dst=/var/lib/postgresql/data,volume-driver=local \
    --env POSTGRES_PASSWORD=postgres \
    --publish 5432:5432 \
    postgres:9.6.1
```

## Create the backend service

```shell
docker service create \
    --name backend \
    --network soho-pool \
    --mount type=volume,src=docs-staging-static-data,dst=/home/app/static/ \
    --mount type=volume,src=docs-staging-media-data,dst=/home/app/media/ \
    --publish 9003 \
    --publish 9002:9002 \
    docker.infor.com/hookandloop/docs_backend_pool:1.0.0
```

## Create the nginx service

```bash
docker service create \
    --name docs \
    --network soho-pool \
    --container-label nginx_proxy_path=docs/docs \
    --container-label endpoint=docs \
    --mount type=volume,src=docs-staging-static-data,dst=/home/app/static/ \
    --mount type=volume,src=docs-staging-media-data,dst=/home/app/media/ \
    --publish 80 \
    docker.infor.com/hookandloop/docs_nginx_pool:1.0.0
```
