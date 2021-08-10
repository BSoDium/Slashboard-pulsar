const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController.js');

// status router
router.get("/:key/status", statusController.getStatus);

// router.post("/camera/update/:id", cameraController.updateCamera);

// router.post("/camera/updateImage/:id", cameraController.updateImage);

// router.post("/camera/rejectContainers/:id", cameraController.rejectContainers);

// router.post("/camera/rejectFilling/:id", cameraController.rejectFilling);

// router.get("/camera/:id", cameraController.getCamera);

// router.get("/camera/:id/interval=:start-:end", cameraController.getGallery);

// // Use days=10-0 to query the stats from 10 days ago to today
// router.get( "/camera/containerData/:id/days=:start-:stop",
//             cameraController.getContainerData);

// router.get("/cameras", cameraController.getCamerasList);

// router.delete("/camera/delete/:id", cameraController.deleteCamera);

module.exports = router;
