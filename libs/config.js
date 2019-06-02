const availableContentTypes = {
  html: "text/html",
  json: "application/json",
  plain: "text/plain",
  js: "text/javascript",
  css: "text/css",
  svg: "image/svg+xml",
  jpg: "image/jpeg",
  png: "image/png"
};

const developmentConfig = {
  PORT: 3000,
  HOST: "localhost",
  availableContentTypes
};

const productionConfig = {
  PORT: 4000,
  HOST: "0.0.0.0",
  availableContentTypes
};

const config =
  process.env.NODE_ENV !== "production" ? developmentConfig : productionConfig;

module.exports = config;
