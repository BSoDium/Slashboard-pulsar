// const axios = require('axios');


// /**
//  * Update the properties of a single camera.
//  * The returned dictionary contains the properties of the camera.
//  */
// exports.updateCamera = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, latitude, longitude } = req.fields;
//     var camera = await Camera.findOne({ name });
//     if (!camera || camera._id == id) {
//       camera = await Camera.findById(id);
//       camera.name = name;
//       camera.latitude = latitude;
//       camera.longitude = longitude;
//       await camera.save();
//       return res.status(200).json({ data: camera, message: "Camera updated" });
//     } else {
//       console.log("Camera already exists");
//       return res.status(400).json({ error: "Camera already exists" });
//     }
//   } catch (error) {
//     console.log(error.message);
//     return res.status(401).json({ error: error.message });
//   }
// }


exports.getStatus = async (req, res) => {
  try {
    const { key } = req.params;
    const content = {
        "key": key,
        "status": "success",
    }
    return res.status(200).json({ data: content });
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ error: error.message });
  }
}
