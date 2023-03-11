FROM nginx:1.23.3-alpine

ARG CR_LABEL
LABEL org.opencontainers.image.source $CR_LABEL

COPY ./ci/staging/nginx/config.nginx /etc/nginx/templates/default.conf.template
COPY ./static /app/static
COPY ./schema.graphql /app/schema.graphql
