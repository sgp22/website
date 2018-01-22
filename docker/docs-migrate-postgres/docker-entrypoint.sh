#! /bin/bash

set -u
set -e


# ENV options
SOURCE_DB_PORT=${SOURCE_DB_PORT:-'5432'}
SOURCE_DB_USER=${SOURCE_DB_USER:-'postgres'}
SOURCE_DB_PASS=${SOURCE_DB_PASS:-'postgres'}
SOURCE_DB=${SOURCE_DB:-'postgres'}
TARGET_DB_HOST=${TARGET_DB_HOST:-'127.0.0.1'}
TARGET_DB_PORT=${TARGET_DB_PORT:-'5432'}
TARGET_DB_USER=${TARGET_DB_USER:-'postgres'}
TARGET_DB_PASS=${TARGET_DB_PASS:-'postgres'}
TARGET_DB=${TARGET_DB:-'postgres'}

# Create .pgpass file for silent operation
echo "${SOURCE_DB_HOST}:${SOURCE_DB_PORT}:${SOURCE_DB}:${SOURCE_DB_USER}:${SOURCE_DB_PASS}" > /root/.pgpass
echo "${TARGET_DB_HOST}:${TARGET_DB_PORT}:${TARGET_DB}:${TARGET_DB_USER}:${TARGET_DB_PASS}" >> /root/.pgpass

chmod 600 /root/.pgpass

STATUS=$(exec /check_psql.py ${SOURCE_DB_HOST} ${SOURCE_DB_PORT} ${SOURCE_DB_USER} ${SOURCE_DB_PASS} ${SOURCE_DB})

if [[ "$STATUS" = 1 ]]; then
	echo "[Error] Cannot connect to Source DB"
	exit 1	
fi

echo "[Info] Connected to Source DB"

STATUS=$(exec /check_psql.py ${TARGET_DB_HOST} ${TARGET_DB_PORT} ${TARGET_DB_USER} ${TARGET_DB_PASS} ${TARGET_DB})
if [[ "$STATUS" = 1 ]]; then
	echo "[Error] Cannot connect to Target DB"
	exit 1	
fi
echo "[Info] Connected to Target DB"

# Drop Target DB Tables
# PGPASSWORD=postgres
# psql --host=172.17.0.1 --port=5432 --username=postgres --p
psql \
	--host=${TARGET_DB_HOST} \
	--port=${TARGET_DB_PORT} \
	--username=${TARGET_DB_USER} \
	--dbname=${TARGET_DB} \
	--command="drop schema public cascade; create schema public;" >/dev/null 2>&1

if [[ "$?" = 1 ]]; then
	echo "[Error] Target Tables failed to be dropped"
	exit 1
fi
echo "[Info] Target DB Tables have been dropped"

# Dumping Source DB and piping it into Target DB
echo "[Info] Importing Source DB into Target DB. This can take a minute."
pg_dump \
	--serializable-deferrable \
	--host=${SOURCE_DB_HOST} \
	--port=${SOURCE_DB_PORT} \
	--username=${SOURCE_DB_USER} \
	--dbname=${SOURCE_DB} \
	| psql \
		--host=${TARGET_DB_HOST} \
		--port=${TARGET_DB_PORT} \
		--username=${TARGET_DB_USER} \
		--dbname=${TARGET_DB} >/dev/null 2>&1

if [[ "$?" = 1 ]]; then
	echo "[Error] Database failed to import"
	exit 1
fi
echo "[Info] Database successfully imported!"