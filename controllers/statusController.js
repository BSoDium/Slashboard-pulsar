const os = require('os');
const fs = require('fs')
const dInf = require('node-disk-info');
const exec = require('child_process').exec;
const pjson = require('../package.json');
const {Citadel} = require("../services/citadel");
const c = require("config");
const {json} = require("mocha/lib/reporters");

function execute(command, callback) {
    exec(command, function (error, stdout, stderr) {
        callback(stdout);
    });
};

// as os returns an average since system boot, we need to calculate the average since the last request
let lastCoresState = {data: os.cpus(), time: Date.now()};

exports.getStatus = async (req, res) => {
    try {
        let disks = null;

        // Fetch mounted disks
        try {
            disks = dInf.getDiskInfoSync();
        } catch (DiskError) {
            console.error(DiskError.message);
            return res.status(500).json({error: DiskError.message});
        }

        if (Citadel.checkJWT(req.headers["Authorization"] || "", appContext.hostname, c.get("security.serverKey"))) {

            let cpuModels = [];

            // calculate CPU load for each core
            const currentCoresState = {data: os.cpus(), time: Date.now()};
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
                "version": pjson.version,
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
            return res.status(200).json({data: content});
        } else {
            console.log("Wrong jwt received");
            return res.status(403).json({data: {"status": "access denied"}});
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: error.message});
    }
}

exports.getOverview = async (req, res) => {
    try {
        let token = req.headers["authorization"] || "no token";
        let checkAuth = Citadel.checkJWT(token, appContext.hostname, c.get("security.serverKey"));
        // console.log(checkAuth, token, JSON.stringify(req.headers), JSON.stringify(appContext));
        if (checkAuth) {

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
            return res.status(200).json({data: content});
        } else {
            console.log("Wrong jwt received");
            return res.status(403).json({data: {"status": "access denied"}});
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: error.message});
    }
}