#!/usr/bin/env bash

if [[ "$NODE_ENV" == 'development' ]]; then
    npx ts-node "libs/database/src/$1/execute";
else
    node "dist/database/$1/execute";
fi;
