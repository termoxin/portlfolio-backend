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

      if (!projectsList.length) {
        callback(false, []);
      }

      if (projectsList) {
        projectsList.forEach(async project => {
          const currentProject = await _data.promiseData(
            "read",
            "projects",
            project
          );
          projectsArray.push(currentProject);

          if (projectsList.length === projectsArray.length) {
            callback(false, projectsArray);
          }
        });
      }
    } catch (err) {
      callback(err);
    }
  }

  static createProject(name, description, image, type, source, callback) {
    name = typeof name === "string" && name.length >= 3 ? name : "";
    description = typeof description === "string" ? description : "";
    image = image ? image : null;
    source = source ? source : null;
    type = type ? type : null;

    if (name && description && type) {
      const id = helpers.getRandomStr(20);

      const data = {
        id,
        name,
        description,
        image,
        source,
        type
      };

      _data.create("projects", name, data, err => {
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

    helpers.verifyToken(token, async (statusCode, err, isAdmin) => {
      if (!err && statusCode === 200 && isAdmin) {
        try {
          const result = await _data.promiseData(
            "update",
            "projects",
            name,
            data
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

  static updateProjects(projects, token, callback) {
    projects = projects.length ? projects : [];

    helpers.verifyToken(token, (statusCode, err, isAdmin) => {
      if (!err && statusCode === 200 && isAdmin) {
        projects.forEach(async project => {
          try {
            const result = await _data.promiseData(
              "update",
              "projects",
              project.name,
              project
            );
            callback(false, result, isAdmin);
          } catch (err) {
            callback(err);
          }
        });
      } else {
        callback(err);
      }
    });
  }

  static deleteProject(name, token, callback) {
    helpers.verifyToken(token, async (statusCode, err, isAdmin) => {
      if (!err && statusCode === 200 && isAdmin) {
        try {
          const result = await _data.promiseData("delete", "projects", name);
          callback(false);
        } catch (err) {
          callback(err);
        }
      } else {
        callback(err);
      }
    });
  }
}

module.exports = Project;
