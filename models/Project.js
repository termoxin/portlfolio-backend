const _data = require("../libs/data");
const helpers = require("../libs/helpers");

class Project {
  static async getProject(name, callback) {
    _data.read("projects", name, (err, data) => {
      if (!err && data) {
        callback(false, data);
      } else {
        callback(err);
      }
    });

    try {
      const data = await _data.promiseData("read", "projects", name);

      callback(false, data);
    } catch (err) {
      callback(err);
    }
  }

  static async getProjects(callback) {
    try {
      let projectsArray = [];

      const projectsList = await _data.promiseData("list", "projects");

      if (projectsList) {
        projectsList.forEach(async project => {
          const currentProject = await _data.promiseData(
            "read",
            "projects",
            project
          );
          projectsArray.push(currentProject);

          if (projectsList.length === projectsArray.length) {
            callback(projectsArray);
          }
        });
      }
    } catch (err) {
      callback(err);
    }
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
