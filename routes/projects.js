const router = require("../libs/router");
const ProjectController = require("../controllers/ProjectController");

router.get("projects", ProjectController.index);
router.post("projects", ProjectController.store);
router.put("projects", ProjectController.update);
router.delete("projects", ProjectController.delete);
