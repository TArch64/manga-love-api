#!/usr/bin/env bash

if [[ "$NODE_ENV" == 'development' ]]; then
    npx ts-node libs/database/src/console/execute;
else
    node dist/database/console/execute;
fi;
