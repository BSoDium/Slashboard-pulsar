#!/bin/bash

cd "$(dirname "$0")"
echo "Updating..."

echo "Stopping Pulsar..."
pm2 stop Pulsar
pm2 delete Pulsar

echo "Backing up the key file..."
cp ./key.txt ../key.txt.bak

echo "Pulling from git..."
git reset --hard
git pull

echo "Restoring the key file..."
cp ../key.txt.bak ./key.txt

echo "Starting Pulsar..."
pm2 start ecosystem.config.js --env production
echo "Done!"