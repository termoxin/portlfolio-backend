const _data = require("../libs/data");
const helpers = require("../libs/helpers");

class Message {
  /**
   * @TODO Make function for getting all items from any collection
   *
   */

  static getMessages(callback) {
    let messageArray = [];

    _data.list("messages", (err, messages) => {
      if (!err && messages) {
        messages.forEach(message => {
          _data.read("messages", message, (err, data) => {
            if (!err && data) {
              messageArray.push(data);
              if (messages.length === messageArray.length) {
                callback(false, messageArray);
              }
            } else {
              callback(err);
            }
          });
        });
      } else {
        callback(err);
      }
    });
  }

  static createMessage(name, email, message, callback) {
    name = typeof name === "string" && name.length >= 3 ? name : false;
    email = typeof email === "string" ? email : false;
    message = message ? message : null;

    const id = helpers.getRandomStr(20);

    if (name && email && message) {
      const data = {
        id,
        name,
        email,
        message,
        status: false
      };

      _data.create("messages", id, data, err => {
        if (!err) {
          callback(false);
        } else {
          callback(err);
        }
      });
    } else {
      callback({ error: "Some fields are invalid or empty." });
    }
  }

  static deleteMessage(id, callback) {
    _data.delete("messages", id, err => {
      if (!err) {
        callback(false);
      } else {
        callback(err);
      }
    });
  }
}

module.exports = Message;
