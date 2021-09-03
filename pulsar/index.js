const express = require("express");
const compression = require("compression");
const helmet = require("helmet");

require("dotenv").config();

const app = express();
app.use(helmet());
app.use(compression());

const routes = require("./routes/routes.js");
app.use(routes);

app.all("*", (req, res) => {
  return res.status(404).json({ error: "Page Not Found" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server has started on port ${process.env.PORT || 5000}`);
});

module.exports = app;
