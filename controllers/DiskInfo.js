const fs = require("fs");

/**
 * Read mounted disks from /proc/mounts and return an array of DiskInfo objects.
 * @param {*} req
 * @param {*} res
 */
exports.getDiskInfo = async (req, res) => {
  try {
    const disks = [];
    const mounts = fs.readFileSync("/host/proc/mounts", "utf8");
    const lines = mounts.split("\n");
    for (const line of lines) {
      const parts = line.split(" ");
      if (parts.length >= 6) {
        const disk = {
          device: parts[0],
          mountpoint: parts[1],
          type: parts[2],
          options: parts[3],
          fsck: parts[4],
          mount: parts[5],
        };
        disks.push(disk);
      }
    }
    res.json(disks);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getDiskInfoSync = () => {
  try {
    const disks = [];
    const mounts = fs.readFileSync("/host/proc/mounts", "utf8");
    const lines = mounts.split("\n");
    for (const line of lines) {
      const parts = line.split(" ");
      if (parts.length >= 6) {
        // const disk = {
        //   device: parts[0],
        //   mountpoint: parts[1],
        //   type: parts[2],
        //   options: parts[3],
        //   fsck: parts[4],
        //   mount: parts[5],
        // };
        const disk = {
          _device: parts[0],
          _filesystem: parts[2],
          _mounted: parts[1],
          _blocks: 1000000000,
          _used: 43,
          _available: 1000000000,
          _capacity: "2%",
        };
        disks.push(disk);
      }
    }
    console.log(disks.length);
    return disks;
  } catch (err) {
    throw err;
  }
};
