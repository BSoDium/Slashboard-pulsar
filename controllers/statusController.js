const os = require('os');
const fs = require('fs')
const dInf = require('node-disk-info');
var exec = require('child_process').exec;

function execute(command, callback) {
  exec(command, function (error, stdout, stderr) { callback(stdout); });
};

// as os returns an average since system boot, we need to calculate the average since the last request
let lastCoresState = { data: os.cpus(), time: Date.now() };

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


      let cpuModels = [];

      // calculate CPU load for each core
      const currentCoresState = { data: os.cpus(), time: Date.now() };
      let cores = os.cpus()

      for (let i = 0; i < cores.length; i++) { // we assume the cpu count is constant
        const core = cores[i];
        let coreOld = lastCoresState.data[i];
        // compare the current and the last cpu state

        const idle = core.times.idle - coreOld.times.idle;
        let total = 0;
        for (const type in core.times) {
          total += core.times[type] - coreOld.times[type];
        }

        cores[i] = {
          model: cores[i].model,
          speed: cores[i].speed,
          load: 100 * (total - idle) / total
        };

        // at the same time, we record all the different cpu models available
        if (!cpuModels.includes(cores[i].model)) {
          cpuModels.push(cores[i].model);
        }
      }

      // save the current cpu state for the next request
      lastCoresState = currentCoresState;

      // calculate the average load for the entire cpu

      const content = {
        "status": "active",
        "name": os.hostname(),
        "os": {
          "type": os.type(),
          "platform": os.platform(),
          "architecture": os.arch(),
          "release": os.release(),
          "uptime": os.uptime(),
        },
        "hardware": {
          "cpu": {
            "cores": cores,
            "global": {
              "model": cpuModels.join(', '), // multi cpu situation is (kind of) handled
              "speed": cores.reduce((acc, cur) => acc + cur.speed, 0) / cores.length,
              "load": cores.reduce((acc, cur) => acc + cur.load, 0) / cores.length
            }
          },
          "memory": {
            "total": os.totalmem(),
            "free": os.freemem(),
          },
          "network": {
            "interfaces": os.networkInterfaces(),
          },
          "disks": disks,
        },
      }
      return res.status(200).json({ data: content });
    } else {
      console.log(`\nStatus request attempt - key is incorrect : \n - Expected : ${data}\n - Received : ${key}`);
      return res.status(401).json({ data: { "status": "access denied" } });
    }
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