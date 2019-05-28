const querystring = require("querystring");

const t = "05r852p81v9fsuz6xoiy";
const tokenRequest = querystring.stringify({ token: t });
const token = t;
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

module.exports = { tokenRequest, token, user, userMockup };
