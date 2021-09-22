const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController.js');
const bearerAuth = require('../controllers/BearerAuth');

// status router
router.get("/status", statusController.getStatus);

// compact status router
router.get("/status-compact", statusController.getOverview);

router.post("/authenticate/jwt", bearerAuth.attemptAuthentication);

module.exports = router;
