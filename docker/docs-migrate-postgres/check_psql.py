#!/usr/bin/python3

import sys
import psycopg2


# sys.argv[2] is the port parameter,
# not being used here.
try:
    db = psycopg2.connect(
        "host='{host}' user='{user}' password='{password}' dbname='{dbname}'".format(
            host=sys.argv[1],
            user=sys.argv[3],
            password=sys.argv[4],
            dbname=sys.argv[5]
        )
    )

    print(0)
except Exception as e:
    print(1)
