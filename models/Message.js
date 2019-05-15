const _data = require("../libs/data");
const helpers = require("../libs/helpers");

class Message {
  /**
   * @TODO Make function for getting all items from any collection
   *
   */

  static async getMessages(callback) {
    let messagesArray = [];
    try {
      const messages = await _data.promiseData("list", "messages");

      messages.forEach(async message => {
        const message = await _data.promise("read", "messsages", message);

        if (message) {
          messagesArray.push(message);
        }

        if (messages.length === messagesArray.length) {
          callback(false, messagesArray);
        }
      });
    } catch (err) {
      callback(err);
    }
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
