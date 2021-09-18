#!/bin/bash

# Write env var for auth key to key.txt if it is defined
if [ -v PULSAR_AUTH_KEY ]; then echo -n $PULSAR_AUTH_KEY > key.txt; fi

npm run start
