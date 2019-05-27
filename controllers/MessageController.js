// Dependencies

const Message = require("../models/Message");

let MessageController = {};

MessageController.index = (data, callback) => {
  Message.getMessages((err, messages) => {
    if (!err && messages) {
      callback(200, messages);
    } else {
      callback(err);
    }
  });
};

MessageController.store = (data, callback) => {
  const { name, email, message } = data.body;

  Message.createMessage(name, email, message, err => {
    if (!err) {
      callback(200);
    } else {
      callback(500, err);
    }
  });
};

MessageController.update = (data, callback) => {
  const { id } = data.body;
  const { token } = data.headers;

  Message.updateMessage(id, token, (err, data) => {
    if (!err) {
      callback(202);
    } else {
      callback(500, err);
    }
  });
};

MessageController.delete = (data, callback) => {
  const { id } = data.queryObject;

  Message.deleteMessage(id, err => {
    if (!err) {
      callback(204);
    } else {
      callback(500, err);
    }
  });
};

module.exports = MessageController;
