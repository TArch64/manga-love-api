ARG APP_IMAGE
ARG APP_VERSION
FROM $APP_IMAGE/app-source:$APP_VERSION as builder

ARG CR_LABEL
ARG APP_NAME
LABEL org.opencontainers.image.source $CR_LABEL

WORKDIR /app

RUN npm run build:app $APP_NAME


ARG APP_IMAGE
ARG APP_VERSION
FROM $APP_IMAGE/app-node:$APP_VERSION

ARG CR_LABEL
LABEL org.opencontainers.image.source $CR_LABEL

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY ./prisma ./prisma
COPY ./scripts ./scripts
COPY ./package.json ./package-lock.json ./
