ARG CR_LABEL
ARG APP_NAME

FROM api-base
LABEL org.opencontainers.image.source $CR_LABEL

RUN npm run build:prod $APP_NAME
