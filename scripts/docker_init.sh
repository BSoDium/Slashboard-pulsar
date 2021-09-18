#!/bin/bash

key=$(cat key.txt)

# if this is the first time running the container, run the setup script
if [ $key == "default" ]; then
  echo "First time running this docker container."
  echo "Generating random 64-char alphanumeric key..."
  key=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 64 | head -n 1)

  echo -n $key > key.txt

  echo "The key was successfully saved."
  echo "+--------------------------------------------------------------------------------+"
  echo "| Your key is : $key |"
  echo "+--------------------------------------------------------------------------------+"
else
  echo "Using existing key."
fi

# run the app
npm run start
