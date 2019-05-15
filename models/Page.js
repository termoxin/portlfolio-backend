const _data = require("../libs/data");

class Page {
  static async getUsers(callback) {
    try {
      const result = await _data.promiseData("list", "users");

      if (!err && users) return callback(users);
    } catch (err) {
      callback(false);
    }
  }
}

module.exports = Page;
