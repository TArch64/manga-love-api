#!/usr/bin/env bash

echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "Building app-source";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";

docker pull "$APP_IMAGE/app-source:latest" || true;

docker build \
  --tag "$APP_IMAGE/app-source:latest" \
  --tag "$APP_IMAGE/app-source:$APP_VERSION" \
  --file "ci/$ENV/build/app-source.Dockerfile" \
  --cache-from "$APP_IMAGE/app-node:latest" \
  --cache-from "$APP_IMAGE/app-source:latest" \
  --build-arg BUILDKIT_INLINE_CACHE \
  --build-arg CR_LABEL \
  --build-arg APP_IMAGE \
  --build-arg APP_VERSION \
  . && \
docker push -a "$APP_IMAGE/app-source";
