#!/bin/bash

cd "$(dirname "$0")"
echo "Leaving so soon ? Please file an issue if you encountered any difficulties."
pm2 delete Pulsar
echo "Do you want to uninstall pm2 [Y/n]?"
read choice
if [ $choice == "Y" -o $choice == "y" ]
then
  npm uninstall pm2 -g
  echo "Successfully uninstalled pm2."
else
  echo "Skipped."
fi

sudo ufw delete allow 6033
echo "Firewall rule 'allow 6033' deleted."
echo
echo "Uninstallation complete."
