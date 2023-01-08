#!/usr/bin/env bash

APP_IMAGE="$1";

docker pull "$APP_IMAGE/$APP_NAME:latest" || true;

docker build \
  --tag "$APP_IMAGE/$APP_NAME:latest" \
  --tag "$APP_IMAGE/$APP_NAME:$APP_VERSION" \
  --file "ci/$ENV/build/microservice.Dockerfile" \
  --cache-from "$APP_IMAGE/app-node:$APP_VERSION" \
  --cache-from "$APP_IMAGE/app-sources:$APP_VERSION" \
  --cache-from "$APP_IMAGE/$APP_NAME:latest" \
  --build-arg BUILDKIT_INLINE_CACHE \
  --build-arg CR_LABEL \
  --build-arg APP_NAME \
  --build-arg APP_IMAGE \
  --build-arg APP_VERSION \
  . && \
docker push -a "$APP_IMAGE/$APP_NAME";
