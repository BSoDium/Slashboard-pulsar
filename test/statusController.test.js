const app = require('../index');
const request = require("supertest");
const backend = request(app);
const config = require("config");

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
  describe('getStatusCompact tests', () => {
    before('Fetch bearer, perform get request with both correct and incorrect bearer', async function () {
      // retrieve bearer
      const bearerResponse = await backend.post('/authenticate/jwt').set('Content-Type', 'application/json').send({
        auth: config.get('security.sharedSecret')
      });

      responses.valid = await backend.get(`/status-compact`).set('Authorization', `Bearer ${bearerResponse.body.bearer}`);
      responses.invalid = await backend.get(`/status-compact`).set('Authorization', `Bearer ${bearerResponse.body.bearer + 'a'}`);
    });
    it('Security OK', () => {
      responses.valid.status.should.equal(200);
      responses.invalid.status.should.equal(403);
    });

    it('Response status check', () => {
      responses.valid.body.data.status.should.equal("active");
      responses.invalid.body.data.status.should.equal("access denied");
    });

    it('Payload check - valid responses', () => {
      responses.valid.body.data.hasOwnProperty("name").should.equal(true);
      responses.valid.body.data.hasOwnProperty("os").should.equal(true);
    });

    it('Payload check - invalid responses', () => {
      responses.invalid.body.data.hasOwnProperty("name").should.equal(false);
      responses.invalid.body.data.hasOwnProperty("os").should.equal(false);
    });
  });

  describe('getStatus tests', () => {
    before('Fetch bearer, perform get request with both correct and incorrect bearer', async function () {
      // retrieve bearer
      const bearerResponse = await backend.post('/authenticate/jwt').set('Content-Type', 'application/json').send({
        auth: config.get('security.sharedSecret')
      });

      // only works with status-compact atm
      responses.valid = await backend.get(`/status`).set('authorization', `Bearer ${bearerResponse.body.bearer}`);
      responses.invalid = await backend.get(`/status`).set('authorization', `Bearer ${bearerResponse.body.bearer + 'a'}`);
    });
    it('Security OK', () => {
      responses.valid.status.should.equal(200);
      responses.invalid.status.should.equal(403);
    });

    it('Response status check', () => {
      responses.valid.body.data.status.should.equal("active");
      responses.invalid.body.data.status.should.equal("access denied");
    });

    it('Payload check - valid responses', () => {
      responses.valid.body.data.hasOwnProperty("name").should.equal(true);
      responses.valid.body.data.hasOwnProperty("os").should.equal(true);
      responses.valid.body.data.hasOwnProperty("hardware").should.equal(true);
    });

    it('Payload check - invalid responses', () => {
      responses.invalid.body.data.hasOwnProperty("name").should.equal(false);
      responses.invalid.body.data.hasOwnProperty("os").should.equal(false);
      responses.invalid.body.data.hasOwnProperty("hardware").should.equal(false);
    });
  });
});
