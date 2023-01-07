#!/usr/bin/env sh

root="$HOME/app"
env_file="$root/.env"
docker_compose_file="$root/docker-compose.yaml"

export $(cat $env_file | xargs) && \
echo $CR_PASSWORD | docker login $CR_HOST -u $CR_USERNAME --password-stdin && \
docker compose -f $docker_compose_file down --remove-orphans && \
docker compose -f $docker_compose_file run --rm backend npm run prisma db push -- --skip-generate && \
docker compose -f $docker_compose_file up --detach;
