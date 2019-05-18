const router = require("../libs/router");
const PageController = require("../controllers/PageController");

router.get("index", PageController.index);

