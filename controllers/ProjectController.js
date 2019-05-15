// Dependencies

const Project = require("../models/Project");

let ProjectController = {};

ProjectController.index = (data, callback) => {
  const { name } = data.queryObject;

  if (name) {
    Project.getProject(name, (err, data) => {
      if (!err && data) {
        callback(200, data);
      } else {
        callback(500, err);
      }
    });
  } else {
    Project.getProjects((data) => {
      if (data) {
        callback(200, data);
      } 
    });
  }
};

ProjectController.store = (data, callback) => {
  const { name, description, img, src } = data.body;

  Project.createProject(name, description, img, src, err => {
    if (!err) {
      callback(202);
    } else {
      callback(500, err);
    }
  });
};

ProjectController.update = (data, callback) => {
  const { name, description, img, src } = data.body;
  const { token } = data.headers;

  Project.updateProject(name, description, img, src, token, (err, data) => {
    if (!err) {
      callback(200);
    } else {
      callback(500, err);
    }
  });
};

ProjectController.delete = (data, callback) => {
  const { name } = data.queryObject;
  const { token } = data.headers;

  Project.deleteProject(name, token, err => {
    if (!err) {
      callback(204);
    } else {
      callback(err);
    }
  });
};

module.exports = ProjectController;
