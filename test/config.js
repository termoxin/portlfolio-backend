const querystring = require("querystring");

const t = "tedfdudnbqr9ju8did4j";
const tokenRequest = querystring.stringify({ token: t });
const token = t;
const user = {
  username: "admin",
  password: "123123"
};

const projectMockup = {
  name: "Test",
  description: "Test project",
  type: "js"
};

const messageMockup = {
  name: "Test",
  email: "test@gmail.com",
  message: "Hey"
};

const userMockup = {
  username: "test",
  firstName: "Testing",
  lastName: "Testonov",
  password: "123123test"
};

module.exports = {
  tokenRequest,
  token,
  user,
  userMockup,
  projectMockup,
  messageMockup
};
