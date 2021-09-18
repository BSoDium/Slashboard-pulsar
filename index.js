const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const config = require("config");
const crypto = require("node:crypto");
const citadel = require("./services/citadel");

const cit = new citadel.Citadel();
const app = express();
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

const routes = require("./routes/routes.js");
const os = require("os");
const c = require("config");
app.use(routes);

app.all("*", (req, res) => {
  return res.status(404).json({ error: "Page Not Found" });
});

app.listen(config.get("server.port") || 5000, () => {
  console.log(`Server has started on port ${config.get("server.port") || 5000}`);
});

global.appContext = {
  hashedPassword: cit.encodePasswordSync(config.get("security.password")),
  runId: crypto.randomUUID(),
  hostname: crypto.createHash("sha256").update(os.hostname(), "utf-8").digest("hex"),
  serverKey: c.get("security.serverKey"),
};
module.exports = app;
