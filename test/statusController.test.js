const app = require('../index');
const fs = require('fs')
const request = require("supertest");
const { response } = require('../index');
const backend = request(app);

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = chai.should();

/** 
 * A set of tests for all of the API routes of the backend
 */
describe('statusController.js tests', function () {
  this.timeout(10000);
  var responses = {
    valid: null,
    invalid: null,
  };

  /** 
   * Test for the API route that returns the status of the server.
   */
  describe('getStatus tests', () => {
    before('Read key from file, got two responses', async function () {
      let key;
      try {
        key = fs.readFileSync('./key.txt', 'utf8');
      }
      catch (FileError) {
        console.error(FileError.message);
      }
      response.valid = await backend.get(`/${key}/status`)
      response.invalid = await backend.get(`/${key}eetyvgzk10/status`)
      return response;
    });
    it('Response OK', () => {
      response.valid.status.should.equal(200);
      response.invalid.status.should.equal(401);
    });

    it('Response status check', () => {
      response.valid.body.data.status.should.equal("active");
      response.invalid.body.data.status.should.equal("access denied");
    });

    it('Payload check - valid response', () => {
      response.valid.body.data.hasOwnProperty("name").should.equal(true);
      response.valid.body.data.hasOwnProperty("os").should.equal(true);
      response.valid.body.data.hasOwnProperty("hardware").should.equal(true);
    });

    it('Payload check - invalid response', () => {
      response.invalid.body.data.hasOwnProperty("name").should.equal(false);
      response.invalid.body.data.hasOwnProperty("os").should.equal(false);
      response.invalid.body.data.hasOwnProperty("hardware").should.equal(false);
    });
  });
});
