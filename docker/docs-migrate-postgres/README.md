# PostgreSQL DB Migration

A docker container for migrating a PostgreSQL DB from one host to another.

## Notes

* This script drops the Target DB's Tables. Please use with caution, any customizations to the Target CMS will be lost forever
* Requires `make` to be installed. To install on your Mac, run: `xcode-select --install`.
* The `postgres` container must be running on your local dev with port `5432` open to the host.
* Requires that your public IP needs to be whitelisted with the source DB.

## Usage

First, confirm your Application Containers are running `docker ps`, then run:

```sh
make syncdb
```
