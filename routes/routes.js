const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController.js');

// status router
router.get("/:key/status", statusController.getStatus);

// compact status router
router.get("/:key/status-compact", statusController.getOverview);

module.exports = router;
