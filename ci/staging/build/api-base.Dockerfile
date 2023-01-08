FROM node:18-slim
ARG CR_LABEL
LABEL org.opencontainers.image.source $CR_LABEL

WORKDIR /app

ENV NODE_ENV production
RUN apt-get update && apt-get install -y openssl procps --no-install-recommends

COPY ./package.json ./package-lock.json ./
RUN npm pkg delete scripts.prepare
RUN npm ci --omit=dev

COPY . ./
RUN npm run prisma generate

