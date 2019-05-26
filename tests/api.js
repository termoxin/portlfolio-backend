// Tests for internal API user, token

const assert = require("assert");
const http = require("http");
const querystring = require("querystring");
const app = require("./../index");
const config = require("../libs/config");
const { token, user } = require("./config");

let api = {};
let helpers = {};

helpers.request = (path, method = "GET", data = {}, callback) => {
  const postData = JSON.stringify(data);
  const requestDetails = {
    port: config.PORT,
    hostname: config.HOST,
    method,
    path,
    headers: {
      "Content-type": "application/json",
      "Content-Length": Buffer.byteLength(postData)
    }
  };

  const req = http.request(requestDetails, res => {
    callback(res);
  });

  req.write(postData);
  req.end();
};

const params = querystring.stringify({ token });

// api["app.init should start without throwing"] = done => {
//   assert.doesNotThrow(() => {
//     app.init(err => {
//       done();
//     });
//   }, TypeError);
// };

/**
 * @TODO test that
 *
 */

api["api/tokens respond to GET with 200"] = done => {
  helpers.request("/api/tokens?" + params, "GET", {}, res => {
    assert.equal(res.statusCode, 200);
    done();
  });
};

api["api/tokens respond to POST with 200"] = done => {
  helpers.request("/api/tokens", "POST", user, res => {
    assert.equal(res.statusCode, 200);
    done();
  });
};

api["api/tokens respond to PUT with 202"] = done => {
  helpers.request("/api/tokens", "PUT", { token }, res => {
    assert.equal(res.statusCode, 202);
    done();
  });
};

api["api/tokens respond to DELETE with 204"] = done => {
  helpers.request("/api/tokens?" + params, "DELETE", {}, res => {
    assert.equal(res.statusCode, 204);
    done();
  });
};

module.exports = api;
