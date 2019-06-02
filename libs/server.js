const http = require("http");
const url = require("url");
const { StringDecoder } = require("string_decoder");
const querystring = require("querystring");
const util = require("util");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const debug = util.debuglog("server");
const config = require("./config");
const handlers = require("./handlers");
const helpers = require("./helpers");
const router = require("./router");
const routes = require("../routes");

let server = {};

server.httpServer = () => {
  const httpServer = http.createServer(server.requestHandler);

  httpServer.listen(config.PORT, config.HOST, () => {
    console.log(
      "\x1b[32m%s\x1b[0m",
      `Server's listening in port: ${config.PORT}`
    );
  });
};

server.collectRequestData = (req, res, callback) => {
  if (req.url === "/api/uploadFile") {
    const form = new formidable.IncomingForm();

    form.uploadDir = path.join(__dirname, "../public/img");
    form.keepExtensions = true;

    form.on("fileBegin", function(name, file) {});

    form.on("progress", function(bytesReceived, bytesExpected) {});

    form.on("file", function(name, file) {
      fs.renameSync(file.path, form.uploadDir + "/" + "avatar.jpg");
    });

    form.on("aborted", function(err) {
      callback({ file: "ERROR!" });
    });

    form.on("end", function() {
      callback({ file: "OK!" });
    });

    form.parse(req);
  } else {
    const FORM_URLENCODED = "application/x-www-form-urlencoded";
    const APPLICATION_JSON = "application/json";

    const decoder = new StringDecoder("utf8");

    if (
      req.headers["content-type"] === FORM_URLENCODED ||
      req.headers["content-type"] === APPLICATION_JSON
    ) {
      let body = "";
      req.on("data", chunk => {
        body += chunk;
      });

      req.on("end", () => {
        body = typeof body === "string" ? helpers.parseJSONtoObject(body) : {};

        callback(body);
      });
    } else {
      callback({});
    }
  }
};

server.requestHandler = (req, res) => {
  const address = url.parse(req.url);
  const queryObject = querystring.parse(address.query);
  const pathname = address.pathname.replace(/^\/+|\/+$/gi, "");
  let method = req.method.toLowerCase();
  const headers = req.headers;
  const availableMethods = ["get", "post", "put", "delete"];

  if (method === "options") {
    method = "post";
  }

  server.collectRequestData(req, res, body => {
    let data = {
      address,
      body,
      headers,
      method,
      queryObject
    };

    if (availableMethods.indexOf(method) > -1) {
      let chosenHandler =
        router.routes.hasOwnProperty(method) &&
        router.routes[method].hasOwnProperty(pathname)
          ? router.routes[method][pathname]
          : server.notFound;

      chosenHandler =
        address.pathname.indexOf("/public") > -1
          ? handlers.public
          : chosenHandler;

      chosenHandler(data, (statusCode, payload, contentType) => {
        payload = typeof payload !== "undefined" ? payload : {};

        payload =
          !Buffer.isBuffer(payload) && typeof payload === "object"
            ? JSON.stringify(payload)
            : payload;

        contentType = typeof contentType === "string" ? contentType : "json";

        if (config.availableContentTypes.hasOwnProperty(contentType)) {
          res.writeHead(statusCode, {
            "Content-Type": config.availableContentTypes[contentType],
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
            "Access-Control-Allow-Headers": "*"
          });

          res.end(payload);
        }

        if (statusCode === 200) {
          debug(
            `\x1b[32m%s\x1b[0m`,
            `${method.toUpperCase()} ${pathname} ${statusCode}`
          );
        } else {
          debug(
            "\x1b[31m%s\x1b[0m",
            `${method.toUpperCase()} ${pathname} ${statusCode}`
          );
        }
      });
    }
  });
};

server.init = () => {
  server.httpServer();
};

server.notFound = (_, callback) => {
  callback(404, "Not found");
};

module.exports = server;
