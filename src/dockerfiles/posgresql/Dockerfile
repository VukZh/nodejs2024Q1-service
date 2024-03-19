FROM postgres:alpine3.19
COPY init.sql /docker-entrypoint-initdb.d/
VOLUME /var/lib/postgresql/data
