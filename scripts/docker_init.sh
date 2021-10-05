#!/bin/bash

# Each time an image is built and a container is created, new public and secret 
# keys are generated.
# The user needs to check the container's logs to retrieve the public key.

serverKey=$(cat config/default.json | python3 -c "
import sys, json; 
print(json.load(sys.stdin)['security']['serverKey'])
")


if [ $serverKey == "default" ]; then
	echo "First time starting up this container."
	echo "Generating random 64-char alphanumeric keys..."
	serverKey=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 64 | head -n 1)
	sharedSecret=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 64 | head -n 1)

	# write key to configuration file
	echo "{\"security\": {\"serverKey\": \"$serverKey\", \"sharedSecret\": \"$sharedSecret\", \"jwtLifetime\": 3600}}" > config/default.json

	echo "The key was successfully saved."
  echo "+--------------------------------------------------------------------------------+"
  echo "| Your key is : $sharedSecret |"
  echo "+--------------------------------------------------------------------------------+"

	echo "Running ssh-keygen..."
	ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""
	echo "Done."
	echo "This is your public key :"
	cat ~/.ssh/id_rsa.pub
	echo "Please add it to ~/.ssh/authorized_keys on your server, it will allow the container"
	echo "to retrieve the necessary data in real time."
	
	
else
	echo "Using existing configuration."
fi

# Start the program
npm run start
