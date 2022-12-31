FROM node:18-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl procps --no-install-recommends
