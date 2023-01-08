#!/usr/bin/env bash

echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "Building nginx";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";

docker pull "$APP_IMAGE/nginx:latest" || true

docker build \
  --tag "$APP_IMAGE/nginx:latest" \
  --tag "$APP_IMAGE/nginx:$APP_VERSION" \
  --file "ci/$ENV/build/nginx.Dockerfile" \
  --cache-from "$APP_IMAGE/nginx" \
  --build-arg BUILDKIT_INLINE_CACHE \
  --build-arg CR_LABEL \
  . && \
docker push -a "$APP_IMAGE/nginx";
