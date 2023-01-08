#!/usr/bin/env bash

echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "Building app-node";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";

docker pull "$APP_IMAGE/app-node:latest" || true;

docker build \
  --tag "$APP_IMAGE/app-node:latest" \
  --tag "$APP_IMAGE/app-node:$APP_VERSION" \
  --file "ci/$ENV/build/app-node.Dockerfile" \
  --cache-from "$APP_IMAGE/app-node:latest" \
  --build-arg BUILDKIT_INLINE_CACHE \
  --build-arg CR_LABEL \
  . && \
docker push -a "$APP_IMAGE/app-node";
