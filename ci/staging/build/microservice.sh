#!/usr/bin/env bash

APP_NAME="$1";

docker pull "$APP_IMAGE/$APP_NAME:latest" || true;

docker build \
  --target builder \
  --tag "$APP_IMAGE/$APP_NAME-builder:latest" \
  --tag "$APP_IMAGE/$APP_NAME-builder:$APP_VERSION" \
  --file "ci/$ENV/build/microservice.Dockerfile" \
  --cache-from "$APP_IMAGE/app-node:$APP_VERSION" \
  --cache-from "$APP_IMAGE/app-sources:$APP_VERSION" \
  --cache-from "$APP_IMAGE/$APP_NAME-builder:latest" \
  --build-arg BUILDKIT_INLINE_CACHE \
  --build-arg CR_LABEL \
  --build-arg APP_NAME \
  --build-arg APP_IMAGE \
  --build-arg APP_VERSION \
  . && \
docker push -a "$APP_IMAGE/$APP_NAME-builder" && \
docker build \
  --tag "$APP_IMAGE/$APP_NAME:latest" \
  --tag "$APP_IMAGE/$APP_NAME:$APP_VERSION" \
  --file "ci/$ENV/build/microservice.Dockerfile" \
  --cache-from "$APP_IMAGE/app-node:$APP_VERSION" \
  --cache-from "$APP_IMAGE/app-sources:$APP_VERSION" \
  --cache-from "$APP_IMAGE/$APP_NAME:latest" \
  --cache-from "$APP_IMAGE/$APP_NAME-builder:latest" \
  --build-arg BUILDKIT_INLINE_CACHE \
  --build-arg CR_LABEL \
  --build-arg APP_NAME \
  --build-arg APP_IMAGE \
  --build-arg APP_VERSION \
  . && \
docker push -a "$APP_IMAGE/$APP_NAME";
