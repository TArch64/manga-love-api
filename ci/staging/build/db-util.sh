#!/usr/bin/env bash

echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "Building db util";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";

docker pull "$APP_IMAGE/db-util-builder:latest" || true;
docker pull "$APP_IMAGE/db-util:latest" || true;

docker build \
  --target builder \
  --tag "$APP_IMAGE/db-util-builder:latest" \
  --tag "$APP_IMAGE/db-util-builder:$APP_VERSION" \
  --file "ci/$ENV/build/microservice.Dockerfile" \
  --cache-from "$APP_IMAGE/app-node:$APP_VERSION" \
  --cache-from "$APP_IMAGE/app-source:$APP_VERSION" \
  --cache-from "$APP_IMAGE/db-util-builder:latest" \
  --build-arg BUILDKIT_INLINE_CACHE \
  --build-arg CR_LABEL \
  --build-arg APP_IMAGE \
  --build-arg APP_VERSION \
  . && \
docker push -a "$APP_IMAGE/db-util-builder" && \

docker build \
  --tag "$APP_IMAGE/db-util:latest" \
  --tag "$APP_IMAGE/db-util:$APP_VERSION" \
  --file "ci/$ENV/build/microservice.Dockerfile" \
  --cache-from "$APP_IMAGE/app-node:$APP_VERSION" \
  --cache-from "$APP_IMAGE/app-source:$APP_VERSION" \
  --cache-from "$APP_IMAGE/db-util-builder:$APP_VERSION" \
  --cache-from "$APP_IMAGE/db-util:latest" \
  --build-arg BUILDKIT_INLINE_CACHE \
  --build-arg CR_LABEL \
  --build-arg APP_IMAGE \
  --build-arg APP_VERSION \
  . && \
docker push -a "$APP_IMAGE/db-util";
