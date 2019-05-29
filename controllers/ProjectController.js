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
    Project.getProjects((err, data) => {
      if (!err && data) {
        callback(200, data);
      }
    });
  }
};

ProjectController.store = (data, callback) => {
  const { name, description, image, type, source } = data.body;

  Project.createProject(name, description, image, type, source, err => {
    if (!err) {
      callback(202);
    } else {
      callback(500, err);
    }
  });
};

ProjectController.update = (data, callback) => {
  const { name, description, image, source } = data.body;
  const { token } = data.headers;

  Project.updateProject(name, description, image, source, token, err => {
    if (!err) {
      callback(202);
    } else {
      callback(500, err);
    }
  });
};

ProjectController.updateSome = (data, callback) => {
  const { projects } = data.body;
  const { token } = data.headers;

  Project.updateProjects(projects, token, (err, data) => {
    if (!err) {
      callback(202);
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
      callback(500, err);
    }
  });
};

module.exports = ProjectController;
