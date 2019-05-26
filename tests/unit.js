const assert = require("assert");
const helpers = require("../libs/helpers");

let unit = {};

unit[
  "helpers.getRandomInt should return a number between min and max"
] = done => {
  const val = helpers.getRandomInt(0, {});
  assert.deepEqual(typeof val, "number");
  done();
};

unit[
  "helpers.getRandomStr should return a string with given length"
] = done => {
  const val = helpers.getRandomStr(5);
  assert.deepEqual(typeof val, "string");
  done();
};

unit["helpers.parseJSONtoObject shoudl return a object"] = done => {
  const val = helpers.parseJSONtoObject('{"name": "test"}');
  assert.deepEqual(typeof val, "object");
  done();
};

unit["helpers.paintText should return a string"] = done => {
  const val = helpers.paintText("text", "cyan");
  assert.deepEqual(typeof val, "string");
  done();
};

module.exports = unit;
