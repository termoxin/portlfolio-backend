const querystring = require("querystring");

const token = querystring.stringify({ token: "5ifpgmzlsf4pkbt3sxuz" });

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
