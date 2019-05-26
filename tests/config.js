const querystring = require("querystring");

const token = querystring.stringify({ token: "7dlmfepms2q2v9xgvfgs" });

const user = {
  username: "admin",
  password: "123123"
};

const userMockup = {
  username: "test",
  firstName: "Testing",
  lastName: "Testonov",
  password: "123123test"
};

module.exports = { token, user, userMockup };
