#!/bin/bash

echo Thank you for installing Pulsar-slashboard
echo this script will daemonize the node js app and run it.

# install pm2
echo Setting up pm2...
npm install pm2 -g || echo there seems to be a problem with your npm installation, the script failed to install pm2

echo Your server will be given a pairing key,
echo you enter a key of your choice or let the script generate it randomly.
echo Do you want to auto-generate it [Y/n] ?
read choice
if [ $choice == "Y" -o $choice == "y" ]
then
    echo Generating random 64-char alphanumeric key.
    key=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 64 | head -n 1)
else
    echo Please provide the key of your choice : 
    read key
fi
echo $key > ../key.txt
echo Successfully written to file.

pm2 start ../index.js
echo Pulsar is now starting up...

echo Do you want pulsar to run on system startup [Y/n] ?
read choice
if [ $choice == "Y" -o $choice == "y" ]
then
  echo [Pulsar] Please follow the instructions displayed by the pm2 startup manager :
  pm2 startup
else
  echo Done.
fi