// Tests for internal API user, token

const assert = require("assert");
const http = require("http");
const querystring = require("querystring");
const app = require("./../index");
const config = require("../libs/config");
const _data = require("../libs/data");

const {
  token,
  tokenRequest,
  user,
  userMockup,
  projectMockup
} = require("./config");

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

describe("API", () => {
  describe("/api/tokens", () => {
    it("/api/tokens respond to GET with 200", done => {
      helpers.request("/api/tokens?" + tokenRequest, "GET", {}, res => {
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it("/api/tokens respond to POST with 200", done => {
      helpers.request("/api/tokens", "POST", user, res => {
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it("/api/tokens respond to PUT with 202", done => {
      helpers.request("/api/tokens", "PUT", { token }, res => {
        assert.equal(res.statusCode, 202);
        done();
      });
    });

    // it("/api/tokens respond to DELETE with 204", done => {
    //   helpers.request("/api/tokens?" + tokenRequest, "DELETE", {}, res => {
    //     assert.equal(res.statusCode, 204);
    //     done();
    //   });
    // });
  });

  describe("/api/users", () => {
    it("/api/users respond to POST with 201", done => {
      helpers.request("/api/users", "POST", userMockup, res => {
        assert.equal(res.statusCode, 201);
        done();
      });
    });

    it("/api/users respond to GET with 200", done => {
      const username = querystring.stringify({ username: user.username });

      helpers.request("/api/users?" + username, "GET", { token }, res => {
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it("/api/users respond to PUT with 202", done => {
      helpers.request(
        "/api/users",
        "PUT",
        {
          token,
          username: userMockup.username,
          password: "newpassword321"
        },
        res => {
          assert.equal(res.statusCode, 202);
          done();
        }
      );
    });

    it("/api/users respond to DELETE with 204", done => {
      const username = querystring.stringify({ username: userMockup.username });

      helpers.request("/api/users?" + username, "DELETE", { token }, res => {
        assert.equal(res.statusCode, 204);
        done();
      });
    });
  });

  describe("/api/projects", async () => {
    before(() => {
      _data
        .promiseData("delete", "projects", projectMockup.name)
        .catch(() => {});
    });

    it("/api/projects respond to POST with 202", done => {
      helpers.request("/api/projects", "POST", projectMockup, res => {
        assert.equal(res.statusCode, 202);
        done();
      });
    });

    it("/api/projects respond to GET with 200 and the project", done => {
      const name = querystring.stringify({ name: projectMockup.name });

      helpers.request("/api/projects?" + name, "GET", {}, res => {
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it("/api/projects respond to GET with 200 and projects", done => {
      helpers.request("/api/projects", "GET", {}, res => {
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it("/api/projects respond to PUT with 202", done => {
      helpers.request(
        "/api/projects",
        "PUT",
        {
          name: projectMockup.name,
          description: "Test description",
          image: "public/img/cover.jpg",
          source: "...",
          token
        },
        res => {
          assert.equal(res.statusCode, 202);
          done();
        }
      );
    });

    it("/api/projects respond to DELETE with 204", done => {
      const name = querystring.stringify({ name: projectMockup.name });

      helpers.request("/api/projects?" + name, "DELETE", { token }, res => {
        assert.equal(res.statusCode, 204);
        done();
      });
    });
  });

  describe("/api/messages", () => {});
});
