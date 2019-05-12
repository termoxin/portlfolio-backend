const _data = require("../libs/data");
const helpers = require("../libs/helpers");

class Project {
  static getProject(name, callback) {
    _data.read("projects", name, (err, data) => {
      if (!err && data) {
        callback(false, data);
      } else {
        callback(err);
      }
    });
  }

  static getProjects(callback) {
    let projectArray = [];

    _data.list("projects", (err, projects) => {
      if (!err && projects) {
        projects.forEach(project => {
          _data.read("projects", project, (err, data) => {
            if (!err && data) {
              projectArray.push(data);
              if (projects.length === projectArray.length) {
                callback(projectArray);
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

  static createProject(name, description, img, src, callback) {
    name = typeof name === "string" && name.length >= 3 ? name : "";
    description = typeof description === "string" ? description : "";
    img = img ? img : null;
    src = src ? src : null;

    const data = {
      name,
      description,
      img,
      src
    };

    _data.create("projects", name, data, err => {
      if (!err) {
        callback(false);
      } else {
        callback(err);
      }
    });
  }

  static updateProject(name, description, img, src, token, callback) {
    name = typeof name === "string" && name.length >= 3 ? name : "";
    description = typeof description === "string" ? description : "";
    img = img ? img : null;
    src = src ? src : null;

    const data = {
      name,
      description,
      img,
      src
    };

    helpers.verifyToken(token, (statusCode, err, isAdmin) => {
      if (!err && statusCode === 200 && isAdmin) {
        _data.update("projects", name, data, (err, data) => {
          if (!err && data) {
            callback(err, data, isAdmin);
          } else {
            callback(err);
          }
        });
      } else {
        callback(err);
      }
    });
  }

  static deleteProject(name, token, callback) {
    helpers.verifyToken(token, (statusCode, err, isAdmin) => {
      if (!err && statusCode === 200 && isAdmin) {
        _data.delete("projects", name, err => {
          if (!err) {
            callback(false);
          } else {
            callback(err);
          }
        });
      } else {
        callback(err);
      }
    });
  }
}

module.exports = Project;
