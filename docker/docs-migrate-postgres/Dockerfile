FROM postgres:9.6.1

ENV TERM xterm

RUN apt-get update && \
	apt-get install -y \
		libpq-dev \
		vim \
        nano \
		python2.7 \
		python-pip \
		python-dev

RUN pip install psycopg2

ADD ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

ADD ./check_psql.py /check_psql.py
RUN chmod +x /check_psql.py

CMD ["/docker-entrypoint.sh"]
