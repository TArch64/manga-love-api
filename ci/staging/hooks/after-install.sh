#!/usr/bin/env sh

root="$HOME/app"
env_file="$root/.env"
docker_compose_file="$root/docker-compose.yaml"

sudo chown -R "$USER:$USER" "$root" && \
rm -f "$env_file" && \
"$root/secrets-loader" get -r us-east-2 -p /manga-love-api/staging >> "$env_file" && \
"$root/secrets-loader" get -r us-east-2 -p /manga-love-api/cr >> "$env_file" && \
export $(cat "$env_file" | xargs) && \
echo "$CR_PASSWORD" | docker login "$CR_HOST" -u "$CR_USERNAME" --password-stdin && \
docker compose -f "$docker_compose_file" pull;
