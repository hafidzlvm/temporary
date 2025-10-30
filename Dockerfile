FROM postgres:latest

# Copy custom config
COPY ./init /docker-entrypoint-initdb.d/
COPY postgresql.conf /usr/share/postgresql/postgresql.conf

EXPOSE 5432
