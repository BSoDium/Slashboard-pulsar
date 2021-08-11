const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const assert = chai.assert;
const expect = chai.expect;
var should = chai.should();
const https = require('https');
const router = require("../routes/routes.js");
const app = require('../index');
const request = require("supertest");
const cameraController = require('../controllers/statusController.js');
const Camera = require('../models/Camera.js');
const { InfluxDB } = require('@influxdata/influxdb-client');
const { FluxTableMetaData } = require('@influxdata/influxdb-client');
const { BlobServiceClient } = require('@azure/storage-blob');

// InfluxDB Connect
const token = 'g2rSTLOOA-C_ybocxGKieSQIlqmkiYvbIYVHO3YcveCq6AM2D7Orou8qrxPVKVQ3EW_LHgcSXBiAbYr0LOlNxQ==';
const org = 'nicolas.jaouen@akanthas.com';
const bucket = 'cameras';
const urlInflux = 'https://eu-central-1-1.aws.cloud2.influxdata.com';

// Azure blob storage Connect
const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=imagecamera;AccountKey=LK6Wb8XCGRrQ7iHZImJaUHy1kr/jgzOc1AH25p7XXeQ+KqN1f/Pa50ks8CUcKi6Wp6b95Yv+vdHyrWLVALP2wQ==;EndpointSuffix=core.windows.net"
const AZURE_SAS_READ = "?sv=2020-02-10&ss=b&srt=sco&sp=rl&se=2031-07-02T14:54:57Z&st=2021-07-02T06:54:57Z&spr=https&sig=eNs1vlFMxexpAUPs%2FRa1zkArhrXWBZeQHj1PQBX2MAA%3D"
// Create the BlobServiceClient object which will be used to create a container client
const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);


const clientInfluxDB = new InfluxDB({
  url: urlInflux,
  token: token,
});
const queryApi = clientInfluxDB.getQueryApi(org);

// const url = "https://camerabackend.herokuapp.com";
// const url = "http://localhost:5000";

const backend = request(app);

const test_image_url = "https://imagecamera.blob.core.windows.net/default/test_image.jpeg";
const test_thumb_url = "https://imagecamera.blob.core.windows.net/default/test_thumb.jpeg";

async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

/** A set of tests for all of the API routes of the backend
 */

describe('cameraController.js tests', function() {
  this.timeout(10000);
  var response;
  var id;

  /** Test of the API route that adds a new camera in the databases.
   * The test generates a fake camera named 'CI Test camera' with latitude and
   * longitude values. Then the function tests the response to verify the name,
   * latitude, longitude, to check the empty answer for containerData and
   * to check the default url.
   */

  describe('addCamera tests', () => {
    before('Camera added', async function() {
      const data = {
        name: 'CI Test camera',
        latitude: -100.001,
        longitude: 100.001,
        id:'59ef29ez2e'
      };
      response = await backend.post(`/camera/add`).send(data);
      id = response.body._id;
      return response;
    });
    it('Response OK (200)',  () => {
      response.status.should.equal(200);
    });
    it('Name is "CI Test camera"', () => {
      response.body.name.should.equal('CI Test camera');
    });
    it("Client is 'Akanthas development team'", () => {
      response.body.client.should.equal("Akanthas development team");
    });
    it('Latitude == -100.001', () => {
      response.body.latitude.should.equal(-100.001);
    });
    it('Longitude == 100.001', () => {
      response.body.longitude.should.equal(100.001);
    });
    it('ID is 59ef29ez2e', () => {
      response.body._id.should.equal('59ef29ez2e');
    })
    it('staticCameraData is empty', () => {
      response.body.staticCameraData.should.be.empty;
    });
    it('No image url', () => {
      should.not.exist(response.body.image_url);
    });
    it('No thumbnail url', () => {
      should.not.exist(response.body.thumb_url);
    });
    it('lastCameraData is empty', () => {
      response.body.lastCameraData.should.be.empty;
    });
  });

  /** Test of the API route that update the characteristics of a camera.
   * The test uses the fake camera named 'CI Test camera' added in the precedent
   * test and makes an update request with a new name 'CI Test camera 2' and new
   * latitude and longitude. Then the function tests the response to verify the
   * name, latitude, longitude, to check the empty answer for containerData
   * and to check the default url.
   */

  describe('updateCamera tests', () => {
    before('Camera updated', async function() {
      const data = {
        name: 'CI Test camera 2',
        latitude: 20.31415926535,
        longitude: -20.31415926535
      };
      response = await backend.post(`/camera/update/${id}`).send(data);
      return response;
    });
    it('Response OK (200)',  () => {
      response.status.should.equal(200);
    });
    it('Name is "CI Test camera 2"', () => {
      response.body.data.name.should.equal('CI Test camera 2');
    });
    it("Client is 'Akanthas development team'", () => {
      response.body.data.client.should.equal("Akanthas development team");
    });
    it('Latitude == 20.31415926535', () => {
      response.body.data.latitude.should.equal(20.31415926535);
    });
    it('Longitude == -20.31415926535', () => {
      response.body.data.longitude.should.equal(-20.31415926535);
    });
    it('staticCameraData is empty', () => {
      response.body.data.staticCameraData.should.be.empty;
    });
    it('No image url', () => {
      should.not.exist(response.body.data.image_url);
    });
    it('No thumbnail url', () => {
      should.not.exist(response.body.data.thumb_url);
    });
    it('lastCameraData is empty', () => {
      response.body.data.lastCameraData.should.be.empty;
    });
  });

  /** Test of the API route that update the last image of a camera.
   * The test uses the fake camera named 'CI Test camera 2' added in the first
   * test and updated in the second one. It makes an update image request with a
   * new image url and fillin_percents array. Then the function tests the
   * response to verify the name, latitude, longitude, to check the new url and
   * containerData.
   */

  describe('updateImage tests', () => {
    before('Camera updated', async function() {
      const data = {
        "image_url":test_image_url + AZURE_SAS_READ,
        "thumb_url":test_thumb_url + AZURE_SAS_READ,
        "cameraData":JSON.stringify([
          {"bbox":[0,0,120,120], "filling_percent":12},
          {"bbox":[15,25,165,120], "filling_percent":75.2}
        ])
      };
      response = await backend.post(`/camera/updateImage/${id}`).send(data);
      return response;
    });
    it('Response OK (200)',  () => {
      response.status.should.equal(200);
    });
    it('Name is "CI Test camera 2"', () => {
      response.body.data.name.should.equal('CI Test camera 2');
    });
    it('Latitude == 20.31415926535', () => {
      response.body.data.latitude.should.equal(20.31415926535);
    });
    it('Longitude == -20.31415926535', () => {
      response.body.data.longitude.should.equal(-20.31415926535);
    });
    it('staticCameraData == {...}', () => {
      response.body.data.staticCameraData.should.deep.equal([
        {"bbox":[0,0,120,120],
         "filling_percent":12,
         "id":0,
         "arrival":response.body.data.staticCameraData[0].arrival,
         "rotation":response.body.data.staticCameraData[0].rotation
       },
       {"bbox":[15,25,165,120],
        "filling_percent":75.2,
        "id":1,
        "arrival":response.body.data.staticCameraData[1].arrival,
        "rotation":response.body.data.staticCameraData[1].rotation
      }
      ]);
    });
    it('staticCameraData == lastCameraData', () => {
      response.body.data.staticCameraData.should.deep.equal(
        response.body.data.lastCameraData
      );
    });
    it('New image url', () => {
      response.body.data.image_url.should.equal(
        test_image_url + AZURE_SAS_READ
      );
    });
    it('New thumbnail url', () => {
      response.body.data.thumb_url.should.equal(
        test_thumb_url + AZURE_SAS_READ
      );
    });

    /** Test of the API route that gives the gallery of images of a camera.
     * The test uses the fake camera named 'CI Test camera 2' added in the first
     * test and updated in the second and third one. It makes a request for the
     * last 100 images in the gallery. Then the function tests the response to
     * verify the presence of the 2 urls and the different containerData.
     */

    describe('getGallery tests', function() {
      beforeEach('Gallery getted', async function() {
        response = await backend.get(`/camera/${id}/interval=0-100`);
        return response;
      });
      it('Response OK (200)',  () => {
        response.status.should.equal(200);
      });
      it("Contains the image's url", function() {
        this.retries(15);
        response.body.data.images.urlImages.should.deep.equal([
          test_image_url + AZURE_SAS_READ,
          ''
        ]);
      });
      it("Contains the thumbnail's url", function() {
        this.retries(15);
        response.body.data.images.urlThumbnails.should.deep.equal([
          test_thumb_url + AZURE_SAS_READ,
          ''
        ]);
      });
      it.skip('content == [[{...}, {...}], []]', function() {
        this.retries(15);
        const date = Object.keys(response.body.data.content);
        const date0  = date[0];
        const date1  = date[1];
        console.log(date);
        const truc = response.body.data.content[date0];
        console.log(truc);
        response.body.data.content.should.deep.equal({
          date0:[
            {
              "bbox":[0,0,120,120],
              "filling_percent":12,
              "id":0,
              "arrival":truc[0].arrival,
              "rotation":truc[0].rotation
           },
           {
             "bbox":[15,25,165,120],
             "filling_percent":75.2,
             "id":1,
             "arrival":truc[1].arrival,
             "rotation":truc[1].rotation
           }
         ],
         date1:[]
        });
      });
    });
  });

  /** Test of the API route that gives the informations of a camera.
   * The test uses the fake camera named 'CI Test camera 2' added in the first
   * test and updated in the second and third one. It makes a get camera
   * request. Then the function tests the response to verify the name, latitude,
   * longitude and the url and containerData sent in the third test.
   */

  describe('getCamera tests', () => {
    before('Camera getted', async function() {
      response = await backend.get(`/camera/${id}`);
      return response;
    });
    it('Response OK (200)',  () => {
      response.status.should.equal(200);
    });
    it('Name is "CI Test camera 2"', () => {
      response.body.data.name.should.equal('CI Test camera 2');
    });
    it("Client is 'Akanthas development team'", () => {
      response.body.data.client.should.equal("Akanthas development team");
    });
    it('Latitude == 20.31415926535', () => {
      response.body.data.latitude.should.equal(20.31415926535);
    });
    it('Longitude == -20.31415926535', () => {
      response.body.data.longitude.should.equal(-20.31415926535);
    });
    it('staticCameraData == {...}', () => {
      response.body.data.staticCameraData.should.deep.equal([
        {"bbox":[0,0,120,120],
         "filling_percent":12,
         "id":0,
         "arrival":response.body.data.staticCameraData[0].arrival,
         "rotation":response.body.data.staticCameraData[0].rotation
       },
       {"bbox":[15,25,165,120],
        "filling_percent":75.2,
        "id":1,
        "arrival":response.body.data.staticCameraData[1].arrival,
        "rotation":response.body.data.staticCameraData[1].rotation
      }
      ]);
    });
    it('staticCameraData == lastCameraData', () => {
      response.body.data.staticCameraData.should.deep.equal(
        response.body.data.lastCameraData
      );
    });
    it('Same image url', () => {
      response.body.data.image_url.should.equal(
        test_image_url + AZURE_SAS_READ
      );
    });
    it('Same thumbnail url', () => {
      response.body.data.thumb_url.should.equal(
        test_thumb_url + AZURE_SAS_READ
      );
    });
  });

  /** Test of the API route that rejects the last image of a camera.
   * The test uses the fake camera named 'CI Test camera 2' added in the first
   * test and updated in the second and third one. It posts a reject image
   * request. Then the function tests the response to verify the status and read
   * the blob object 'Detection error.txt' to check that the URL of the image
   * was written correctly.
   */

  describe('Reject the container detection in test_image', function() {
    var downloaded;
    before('Containers rejected', async function() {
      const data = {
        "image_url":test_image_url
      };
      response = await backend
        .post(`/camera/rejectContainers/${id}`)
        .send(data);
      // Get a reference to a container
      const containerClient = blobServiceClient.getContainerClient(`camera-${id}`);
      // Get the Append Blob
      const appendBlobClient = containerClient.getAppendBlobClient(
        "Detection errors.txt"
      );
      const downloadAppendBlobResponse = await appendBlobClient.download();
      downloaded = await streamToBuffer(
        downloadAppendBlobResponse.readableStreamBody
      );
      return response;
    });
    it('Response OK (200)',  () => {
      response.status.should.equal(200);
    });
    it("'Detection error.txt' created and writed", async () => {
      downloaded.toString().should.equal(test_image_url + "\n");
    });
  });

  /** Test of the API route that rejects the filling detected for one of the
   * bbox in the last image of a camera.
   * The test uses the fake camera named 'CI Test camera 2' added in the first
   * test and updated in the second and third one. It posts a reject filling
   * request. Then the function tests the response to verify the status and read
   * the blob object 'Filling errors.txt' to check that the URL of the image
   * was written correctly along with the bbox given.
   */

  describe('Reject the filling of [0,0,120,120] in test_image', function() {
    var downloaded;
    var data;
    before('Filling rejected', async function() {
      data = {
        "image_url":test_image_url,
        "bbox":[0,0,120,120]
      };
      response = await backend
        .post(`/camera/rejectFilling/${id}`)
        .send(data);
      // Get a reference to a container
      const containerClient = blobServiceClient.getContainerClient(`camera-${id}`);
      // Get the Append Blob
      const appendBlobClient = containerClient.getAppendBlobClient(
        "Filling errors.txt"
      );
      const downloadAppendBlobResponse = await appendBlobClient.download();
      downloaded = await streamToBuffer(
        downloadAppendBlobResponse.readableStreamBody
      );
      return response;
    });
    it('Response OK (200)',  () => {
      response.status.should.equal(200);
    });
    it("'Filling error.txt' created and writed", async () => {
      downloaded.toString().should.equal(JSON.stringify(data) + "\n");
    });
  });

  /** Test of the API route that deletes a camera.
   * The test uses the fake camera named 'CI Test camera 2' added in the first
   * test and updated in the second and third one. It makes a delete camera
   * request but also directly deletes the data in the blob created for this
   * camera. Then the function tests the response to verify the successful
   * deletion and makes an influxDB query to verify the camera's deletion.
   */

  describe('deleteCamera tests', function() {
    this.retries(4);
    before('Camera deleted', async function() {
      const containerClient = blobServiceClient.getContainerClient(
        `camera-${id}`
      );
      await containerClient.delete();
      response = await backend.delete(`/camera/delete/${id}`);
      return response;
    });

    it('Response OK (200)',  () => {
      response.status.should.equal(200);
    });
    it('Camera is deleted', () => {
      response.body.message.should.equal('Camera deleted');
    });

    describe('Query InfluxDB', async function() {
      var cameraInflux;
      before('Query InfluxDB', async function() {
        const query = `
         from(bucket: "${bucket}")
           |> range(start: -1h)
           |> filter(fn: (r) => r._measurement == "${id}")`
        cameraMongo = await queryApi.queryRows(query, {
          next(row, tableMeta) {
            const o = tableMeta.toObject(row);
            cameraInflux = o;
          },
          error(error) {
            console.error(error);
            console.log('Finished ERROR');
          },
          async complete() {
            return cameraInflux;
          }
        });
      });

      it('Camera no longer in InfluxDB', () => {
        should.not.exist(cameraInflux);
      });
    });

    describe.skip('Query MongoDB', async function() {
      var cameraMongo;
      before('Query MongoDB', async function() {
        cameraMongo = Camera.findById(id);
        console.log(cameraMongo);
        return await cameraMongo;
      });

      it('Camera no longer in MongoDB', async () => {
        should.not.exist(cameraMongo);
      });

    });
  });

});
