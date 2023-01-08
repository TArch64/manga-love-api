#!/usr/bin/env bash

if [[ "$NODE_ENV" == 'development' ]]; then
    npx ts-node libs/database/src/seeds/execute;
else
    node dist/database/seeds/execute;
fi;
