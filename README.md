# Slashboard Pulsar
<img src="https://raw.githubusercontent.com/l3alr0g/Slashboard-pulsar/main/assets/icon.png" alt="Logo" width="100" align="left" />

A lightweight node js app designed to work with [the Slashboard desktop client](https://github.com/l3alr0g/Slashboard-desktop)

> Built using Node.js
<br/>
 
## Installation
- Clone this repository somewhere safe on your server (`/var/www` is often a good choice)
  
  ```sh
  cd /var/www  # replace /var/www with the path you prefer if necessary
  git clone https://github.com/l3alr0g/Slashboard-pulsar.git
  ```
  
- Install all the necessary dependencies
  ```sh
  cd Slashboard-pulsar
  npm install
  ```

### Automated installation (Linux only)
- Run the installation script for your OS (only available for linux at the moment)
  
  ```sh
  ./scripts/install.sh
  ```
  This script will : 
   - setup nodejs if necessary
   - install pm2 (used to daemonize the app)
   - generate a **pairing key** for your server, which will be later required by the desktop client
   - at the end, it will ask you if you want to run Pulsar on system startup (recommended), if you answer yes, the script will give you a command, which you should paste and run in the terminal manually (I am working on automating this, but until now, this is mandatory)
   
### Manual installation (Linux)
  
  - [Setup nodejs and npm](https://nodejs.org/en/download/package-manager/)
  
  - Setup pm2 :
    ```sh
    npm install pm2 -g
    ```
  - Choose an authentification key and a server-specific secret : 
    ```sh
    nano config/default.json
    ```
    By default, the generated keys are 64 characters long, but you can choose shorter ones.
    When you'll open the file for the first time, The fields will contain the word "default". Erase it and write your key.

    The field `serverKey` is the local server secret, and `sharedSecret` is the key used by the client to connect to your server. It will be later required when registering the server in the desktop app.

    > Warning : no special characters allowed, only alphanumeric characters. Example : `CRml6VcWMGlH8UQ1XjintL1Tu71IA5ktbA5I8g0HzwrhF4E0hNE50O1ep7W2eNOu`
  
  - Allow traffic through port `6033` :
    ```sh
    sudo ufw allow 6033
    ```
  
  - Start the app :
    ```sh
    pm2 start ecosystem.config.js --env production
    ```
  
  - Tell pm2 to run it on system startup :
    ```sh
    pm2 startup # execute the command pm2 gives you
    ```

  - Save the app list to be restored on reboot :
    ```sh
    pm2 save
    ```

  
### Manual installation (Windows server)
  
  - Download [nodejs and npm](https://nodejs.org/)
  
  - Install pm2
    ```ps
    npm install pm2 -g
    ```
    
  - Install pm2-windows-startup
    ```ps
    npm install pm2-windows-startup -g
    pm2-startup install
    ```
  
  - Open `config/default.json` with your favorite editor, delete the default keys and write your own (see linux manual installation for more details).
    > Warning : no special characters allowed, only alphanumeric characters. Example : `CRml6VcWMGlH8UQ1XjintL1Tu71IA5ktbA5I8g0HzwrhF4E0hNE50O1ep7W2eNOu`

  - Start the app:
    ```ps
    pm2 start ecosystem.config.js --env production
    ```
  
  - Setup pm2 to relaunch the app on system startup :
    ```ps
    pm2 save
    ```

### Docker installation

*Note : This image is still in early access, some features do not fully work as expected.*

- Broken on any OS :
  > - Mounted disks view - the ones displayed don't match the host machine's state
- Broken on Windows :
  > - Hostname (host network mode doesn't exist on Windows)
  > - CPU/RAM usage isn't impressively accurate
  > - Network interface list
___

  - Pull the image from the repository, either from github or dockerhub
  
  - On Linux :
    ```sh
    docker run \
    --network host \ 
    --env SHAREDSECRET="64charSharedSecret"
    l3alr0g/slashboard-pulsar:latest
    ```
    *SHAREDSECRET is optional. If not provided, it will be randomly generated on container creation.*
  
  - On Windows : 
    ```ps
    docker run `
    -p 6033:6033 `
    --env SHAREDSECRET="64charSharedSecret" `
    l3alr0g/slashboard-pulsar:latest
    ```
    *Again, SHAREDSECRET isn't required.*

## Accessing your server from anywhere on the internet
 
 If you want to access your server's dashboard from outside its local network, you will probably need to forward a port in your router's configuration.
 Here's a quick [guide](https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/) to port forwarding, although I suggest that you look for something more specific, because router configuration really depends on your internet provider.
 
 As for the port you need to forward, Pulsar runs on port 6033 by default (cannot be easily changed for now)
 
## Uninstalling Pulsar
  
  Simply run :
  ```sh
  ./scripts/uninstall.sh
  ```
  
  or :
  ```sh
  pm2 delete Pulsar
  npm uninstall pm2 -g
  sudo ufw delete allow 6033 # linux only
  ```
