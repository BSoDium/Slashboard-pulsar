#!/bin/bash

# Output a new key and exit if genkey is the first argument to the script.
if [ $1 = "genkey" ]; then
	echo -n "$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 64 | head -n 1)"
	exit
fi

# Write env var for auth key to key.txt if it is defined
if [ -v PULSAR_AUTH_KEY ]; then echo -n $PULSAR_AUTH_KEY > key.txt; fi

# Start the program
npm run start
