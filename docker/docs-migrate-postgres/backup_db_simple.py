"""
If running it from the backend container for some reason,
do this first to avoid the pg_dump/server version mismatch.

sudo add-apt-repository "deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main"
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get install postgresql-9.6

sudo rm /usr/bin/pg_dump
sudo ln -s /usr/lib/postgresql/9.3/bin/pg_dump /usr/bin/pg_dump
"""
import subprocess
from datetime import datetime


DB_USER = 'postgres'
DB_NAME = 'postgres'
HOST = 'postgres'
BACKUP_PATH = r'/root'
FILENAME_PREFIX = 'docs.backup'


def main():
    now = datetime.now()
    day_of_year = str(now.timetuple().tm_yday).zfill(3)
    filename = "{}.d{}".format(FILENAME_PREFIX, day_of_year)
    destination = "{}/{}".format(BACKUP_PATH, filename)

    print("Backing up {} database to {}".format(DB_NAME, destination))

    ps = subprocess.Popen(
        ['pg_dump', '-h', HOST, '-U', DB_USER, '-Fc', DB_NAME, '-f', destination],
        stdout=subprocess.PIPE)
    output = ps.communicate()[0]

    for line in output.splitlines():
        print(line)


if __name__ == '__main__':
    main()
