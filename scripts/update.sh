#!/bin/bash

cd "$(dirname "$0")"
echo "Updating..."

echo "Stopping Pulsar..."
pm2 stop Pulsar
pm2 delete Pulsar

echo "Backing up the key file..."
cp ../config/default.json ../../default.json.bak

echo "Pulling from git..."
git reset --hard
git pull

echo "Restoring the key file..."
cp ../../default.json.bak ../config/default.json

echo "Starting Pulsar..."
cd ..
pm2 start ecosystem.config.js --env production
echo "Done!"