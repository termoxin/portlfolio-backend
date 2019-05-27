const router = require("../libs/router");
const ProjectController = require("../controllers/ProjectController");

router.get("api/projects", ProjectController.index);
router.post("api/projects", ProjectController.store);
router.put("api/projects", ProjectController.update);
router.delete("api/projects", ProjectController.delete);
router.put("api/updateProjects", ProjectController.updateSome);
