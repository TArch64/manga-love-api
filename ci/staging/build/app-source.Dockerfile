ARG APP_IMAGE
ARG APP_VERSION
FROM ${APP_IMAGE}/app-node:${APP_VERSION}

ARG CR_LABEL
LABEL org.opencontainers.image.source $CR_LABEL

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm pkg delete scripts.prepare
RUN npm ci --omit=dev

COPY . ./
RUN npm run prisma generate
