const assert = require("assert");
const helpers = require("../libs/helpers");
const { token } = require("./config");

describe("Helpers", () => {
  it("helpers.getRandomInt should return a number between min and max", done => {
    const val = helpers.getRandomInt(0, {});
    assert.deepEqual(typeof val, "number");
    done();
  });

  it("helpers.getRandomStr should return a string with given length", done => {
    const val = helpers.getRandomStr(5);
    assert.deepEqual(typeof val, "string");
    done();
  });

  it("helpers.parseJSONtoObject should return a object", done => {
    const val = helpers.parseJSONtoObject('{"name": "test"}');
    assert.deepEqual(typeof val, "object");
    done();
  });

  it("helpers.paintText should return a string", done => {
    const val = helpers.paintText("text", "cyan");
    assert.deepEqual(typeof val, "string");
    done();
  });

  it("helpers.verifyToken should return 200 status code", done => {
    helpers.verifyToken(token, statusCode => {
      assert.equal(200, statusCode);
      done();
    });
  });
});
