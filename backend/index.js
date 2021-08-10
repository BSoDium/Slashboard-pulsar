const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());
app.use(helmet());

const routes = require('./routes/routes.js');
app.use(routes);

app.all("*", (req, res) => {
  return res.status(404).json({ error: "Page Not Found" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server has started on port ${process.env.PORT || 5000}`);
});

module.exports = app;
