FROM ubuntu:14.04

MAINTAINER Hook & Loop Dev

ENV TERM xterm

# Install required packages and remove the apt packages cache when done.
RUN apt-get update \
	&& apt-get install -y \
		update-manager-core \
		software-properties-common \
		nginx \
		supervisor \
		htop \
		nano \
		curl \
	&& add-apt-repository ppa:certbot/certbot \
	&& apt-get update \
	&& apt-get install -y python-certbot-nginx \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Add docker-entrypoint.sh.
COPY docker-entrypoint.sh /home/docker-entrypoint.sh
RUN chown -R root /home/docker-entrypoint.sh
RUN chmod +x /home/docker-entrypoint.sh

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["/home/docker-entrypoint.sh"]