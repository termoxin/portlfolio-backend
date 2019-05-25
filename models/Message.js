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

      if(!messages.length) {
        callback(false, [])
      }

      messages.forEach(async message => {
        const messageData = await _data.promiseData(
          "read",
          "messages",
          message
        );

        if (messages.length === messagesArray.length) {
          callback(false, messagesArray);
        }

        if (messageData) {
          messagesArray.push(messageData);

          if (messages.length === messagesArray.length) {
            callback(false, messagesArray);
          }
        }
      });
    } catch (err) {
      callback(err);
    }
  }

  static async createMessage(name, email, message, callback) {

    name = typeof name === "string" && name.length >= 3 ? name : false;
    email = typeof email === "string" ? email : false;
    message = message ? message : null;


    try {
      const id = helpers.getRandomStr(20);

      if (name && email && message) {
        const data = {
          id,
          name,
          email,
          message,
          status: false
        };

        const messagesData = await _data.promiseData(
          "create",
          "messages",
          id,
          data
        );

         callback(false);
      } else {
        callback({ error: "Some fields are invalid or empty." });
      }
    } catch (err) {
      callback(err);
    }
  }

  static async updateMessage(id, token, callback) {
    helpers.verifyToken(token, async (statusCode, err, isAdmin) => {
      if (!err && statusCode === 200 && isAdmin) {
        try {

          const message = await _data.promiseData("read", "messages", id);

          const result = await _data.promiseData(
            "update",
            "messages",
            id,
            { status: !message.status }

          );
          
          callback(err, result, isAdmin);
        } catch (err) {
          callback(err);
        }
      } else {
        callback(err);
      }
    });
  }


  static async deleteMessage(id, callback) {
    try {
      const data = await _data.promiseData("delete", "messages", id);

      if (!err) {
        callback(false);
      }

    } catch (err) {
      callback(err);
    }
  }
}

module.exports = Message;
