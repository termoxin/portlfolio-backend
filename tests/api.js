// Tests for internal API user, token

const assert = require("assert");
const http = require("http");
const querystring = require("querystring");
const app = require("./../index");
const config = require("../libs/config");
const { token, user, userMockup } = require("./config");

let api = {};
let helpers = {};

helpers.request = (path, method = "GET", data = {}, callback) => {
  data.token = data.token ? data.token : "";

  const postData = JSON.stringify(data);
  const requestDetails = {
    port: config.PORT,
    hostname: config.HOST,
    method,
    path,
    headers: {
      "Content-type": "application/json",
      "Content-Length": Buffer.byteLength(postData),
      token: data.token
    }
  };

  const req = http.request(requestDetails, res => {
    callback(res);
  });

  req.write(postData);
  req.end();
};

api["api/tokens respond to GET with 200"] = done => {
  helpers.request("/api/tokens?" + token, "GET", {}, res => {
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
  helpers.request(
    "/api/tokens",
    "PUT",
    { token: token.split("=")[1].trim() },
    res => {
      assert.equal(res.statusCode, 202);
      done();
    }
  );
};

api["api/users respond to GET with 200"] = done => {
  const username = querystring.stringify({ username: user.username });

  helpers.request(
    "/api/users?" + username,
    "GET",
    { token: token.split("=")[1].trim() },
    res => {
      assert.equal(res.statusCode, 200);
      done();
    }
  );
};

api["api/users respond to POST with 201"] = done => {
  helpers.request("/api/users", "POST", userMockup, res => {
    assert.equal(res.statusCode, 201);
    done();
  });
};

api["api/users respond to PUT with 202"] = done => {
  const actualToken = token.split("=")[1].trim();

  helpers.request(
    "/api/users",
    "PUT",
    {
      token: actualToken,
      username: userMockup.username,
      password: "newpassword321"
    },
    res => {
      assert.equal(res.statusCode, 202);
      done();
    }
  );
};

api["api/users respond to DELETE with 202"] = done => {
  const actualToken = token.split("=")[1].trim();
  const username = querystring.stringify({ username: userMockup.username });

  helpers.request(
    "/api/users?" + username,
    "DELETE",
    { token: actualToken },
    res => {
      assert.equal(res.statusCode, 204);
      done();
    }
  );
};

api["api/tokens respond to DELETE with 204"] = done => {
  helpers.request("/api/tokens?" + token, "DELETE", {}, res => {
    assert.equal(res.statusCode, 204);
    done();
  });
};

module.exports = api;
