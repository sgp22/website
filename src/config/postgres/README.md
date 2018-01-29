# Some PostgreSQL additional configs

## Enable remote access

- Open `/var/lib/postgresql/data/postgresql.conf`.  Usually it is there.  If not, then `find \ -name "postgresql.conf"`.  And make sure this is there `listen_addresses = '*'`.
- Open `/var/lib/postgresql/data/pg_hba.conf` and the last 2 lines from the pg_hba.conf in this directory.
