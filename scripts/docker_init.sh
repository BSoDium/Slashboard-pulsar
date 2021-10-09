#!/bin/bash

echo

# Each time an image is built and a container is created, new public and secret 
# keys are generated.
# The user needs to check the container's logs to retrieve the public key.

serverKey=$(cat config/default.json | python3 -c "
import sys, json; 
print(json.load(sys.stdin)['security']['serverKey'])
")

# check if the user has setup the correct bind mount for the /proc/mount directory
# Edit : this is not supported anymore because it would be impossible to set up
# on windows-server machines.
# if [ ! -e /host/proc/mounts ]; then
# 	echo "Error : Please mount volume /proc/mounts at /host/proc/mounts"
# 	exit 1
# fi

if [ $serverKey == "default" ]; then

	echo "First time starting up this container."
	echo "Generating new configuration..."
	
	echo "- Generating new server key."
	serverKey=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 64 | head -n 1)
	
	# check if the environment variable SHAREDSECRET is defined, if not, generate a new key
	if [ -z "$SHAREDSECRET" ]; then
		echo "- Generating new shared secret."
		sharedSecret=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 64 | head -n 1)
	else
		echo "- Using the shared secret provided by the environment variable SHAREDSECRET."
		sharedSecret=$SHAREDSECRET
	fi

	# write key to configuration file
	echo "{\"security\": {\"serverKey\": \"$serverKey\", \"sharedSecret\": \"$sharedSecret\", \"jwtLifetime\": 3600}}" > config/default.json

	separator="----------------------------------------------------------------------------------"
	echo "The key was successfully saved."
  echo $separator
	echo "  Your key is : $sharedSecret"
	echo $separator

else
	echo "Using existing configuration."
fi

# Start the program
npm run start
