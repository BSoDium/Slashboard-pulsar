const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  _id: String, // Identical to the id of the physical camera
  name: {type: String, unique: true, required: true}, // Name of the camera
  client: String, // Name of the client
  latitude: Number, // Latitude of the physical camera
  longitude: Number, // Longitude of the physical camera
  staticCameraData: [Object], // List of all the different containers detected
  image_url: String, // URL of the last thumbnail for this camera
  thumb_url: String, // URL of the last thumbnail for this camera
  lastUpdate: String, // Date of the last update
  lastCameraData: [Object] // List of the containers detected in the last image
});

const Camera = mongoose.model("Camera", Schema);

module.exports = Camera;
