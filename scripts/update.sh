#!/bin/bash

cd "$(dirname "$0")"
echo "Updating..."

echo "Stopping Pulsar..."
pm2 stop Pulsar
pm2 delete Pulsar

echo "Backing up the key file..."
cp ../config/default.json5 ../../default.json5.bak

echo "Pulling from git..."
git reset --hard
git pull

echo "Restoring the key file..."
cp ../../default.json5.bak ../config/default.json5

echo "Starting Pulsar..."
cd ..
pm2 start ecosystem.config.js --env production
echo "Done!"