const os = require('os');
const fs = require('fs')
const dInf = require('node-disk-info');

exports.getStatus = async (req, res) => {
  try {
    const { key } = req.params;
    let data, disks = null;
    let keyIsValid = false;

    // Get the key from the txt file (security improvement required)
    try {
      data = fs.readFileSync('./key.txt', 'utf8');
    }
    catch (FileError) {
      console.error(FileError.message);
      return res.status(401).json({ error: FileError.message });
    }

    // Fetch mounted disks
    try {
      disks = dInf.getDiskInfoSync();
    } catch (DiskError) {
      console.error(DiskError.message);
      return res.status(401).json({ error: DiskError.message });
    }

    if (data === key) {
      keyIsValid = true;
      
      const content = {
        "status": "active",
        "name": os.hostname(),
        "os" : {
          "type" : os.type(),
          "platform" : os.platform(),
          "architecture" : os.arch(),
          "release" : os.release(),
        },
        "hardware" : {
          "cpus" : os.cpus(),
          "memory" : {
            "total" : os.totalmem(),
            "free" : os.freemem(),
          },
          "network" : {
            "interfaces" : os.networkInterfaces(),
          },
          "disks" : disks,
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
