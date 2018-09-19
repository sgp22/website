FROM ubuntu:14.04

MAINTAINER Hook & Loop Dev <hookandloopjenkins@gmail.com>

RUN locale-gen en_US.UTF-8  
ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8

ENV TERM xterm

RUN apt-get update \
    && apt-get install -y \
      software-properties-common \
      build-essential \
      wget \
    && yes | add-apt-repository ppa:fkrull/deadsnakes \
    && add-apt-repository "deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main"  \
    && wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

RUN apt-get update \
    && apt-get install -y \
      python \
      python-dev \
      python3-dev \
      python3 \
      python3-pip \
      python-setuptools \
      python-software-properties \
      postgresql-contrib \
      postgresql-9.6 \
      memcached \
      libpq-dev \
      libtiff5-dev \
      libjpeg-dev \
      libjpeg8-dev \
      zlib1g-dev \
      libfreetype6-dev \
      liblcms2-dev \
      libwebp-dev \
      libssl-dev \
      libffi-dev \
      libpython-dev \
      tcl8.6-dev \
      tk8.6-dev \
      python-tk \
      supervisor \
      language-pack-en-base \
      git \
      htop \
      nano \
      curl \
      lsof \
    && locale-gen en_US \
    && update-locale LANG=en_US.UTF-8 \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install --upgrade pip \
  && pip3 install --upgrade distribute \
  && pip3 install --ignore-installed six

ADD ./requirements /home/app/requirements/

RUN pip install -r /home/app/requirements/prod.txt --ignore-installed

# TODO This group needs to be a general workers group, not root.
# This does not even help with giving these users to write to
# files created by each other. Probably a docker thing because
# for this group writing to take a effect the user must re-login?
RUN useradd uwsgi && adduser uwsgi root

# Create the supervisor user.
# This needs more research.
RUN useradd supervisor && adduser supervisor root

# Add supervisor config and create log files.
RUN mkdir -p /var/log/workers
RUN touch /var/log/workers/stderr.log \
	/var/log/workers/stdout.log \
	/var/log/django.log

# Add docker-entrypoint.sh.
ADD docker-entrypoint.sh /docker-entrypoint.sh
RUN chown -R root /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose ports
EXPOSE 9002 9003

ENTRYPOINT ["/docker-entrypoint.sh"]
