const os = require('os');
const fs = require('fs')

exports.getStatus = async (req, res) => {
  try {
    const { key } = req.params;
    let data = null;

    try {
      data = fs.readFileSync('./key.txt', 'utf8');
    }
    catch (FileError) {
      console.log(FileError.message);
    }

    if (data === key) {
      console.log("\nStatus request attempt - key is correct.");
      const content = {
        "status": "active",
        "cpus": os.cpus(),
        "memory": {
          "total": os.totalmem(),
          "free": os.freemem()
        },
        "network": {
          "interfaces": os.networkInterfaces()

        }
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
