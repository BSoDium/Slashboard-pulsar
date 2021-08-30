const os = require('os');
const fs = require('fs')
const dInf = require('node-disk-info');

exports.getStatus = async (req, res) => {
  try {
    const { key } = req.params;
    let data = null;
    let keyIsValid = false;

    // Get the key from the txt file (security improvement required)
    try {
      data = fs.readFileSync('./key.txt', 'utf8');
    }
    catch (FileError) {
      console.error(FileError.message);
      return res.status(401).json({ error: FileError.message });
    }

    if (data === key) {
      keyIsValid = true;

      let cpus = os.cpus();
      for (let i = 0; i < cpus.length; i++) {
        const totalTime = Object.values(cpus[i].times).reduce((a, b) => a + b, 0);
        cpus[i] = {
          model: cpus[i].model,
          speed: cpus[i].speed,
          load: (cpus[i].times.user + cpus[i].times.nice + cpus[i].times.sys + cpus[i].times.irq) / totalTime * 100
        };
      }

      const content = {
        "status": "active",
        "name": os.hostname(),
        "os": {
          "type": os.type(),
          "platform": os.platform(),
          "architecture": os.arch(),
          "release": os.release(),
        },
        "hardware": {
          "cpus": cpus,
          "memory": {
            "total": os.totalmem(),
            "free": os.freemem(),
          },
          "network": {
            "interfaces": os.networkInterfaces(),
          },
          "disks": {},
        },
      }
      return res.status(200).json({ data: content });
    } else {
      return res.status(401).json({ data: { "status": "access denied" } });
    }
    console.log(`\nStatus request attempt - key is ${keyIsValid ? null : "in"}correct${keyIsValid ? "." : ` : \n - Expected : ${data}\n - Received : ${key}`}`);
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ error: error.message });
  }
}

exports.getOverview = async (req, res) => {
  try {
    const { key } = req.params;
    let data = null;
    let keyIsValid = false;

    // Get the key from the txt file (security improvement required)
    try {
      data = fs.readFileSync('./key.txt', 'utf8');
    }
    catch (FileError) {
      console.error(FileError.message);
      return res.status(401).json({ error: FileError.message });
    }

    if (data === key) {
      keyIsValid = true;

      const content = {
        "status": "active",
        "name": os.hostname(),
        "os": {
          "type": os.type(),
          "platform": os.platform(),
          "architecture": os.arch(),
          "release": os.release(),
        }
      }
      return res.status(200).json({ data: content });
    } else {
      return res.status(401).json({ data: { "status": "access denied" } });
    }
    console.log(`\nOverview request attempt - key is ${keyIsValid ? null : "in"}correct${keyIsValid ? "." : ` : \n - Expected : ${data}\n - Received : ${key}`}`);
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ error: error.message });
  }
}