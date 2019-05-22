const router = require("../libs/router");
const MessageController = require("../controllers/MessageController");

router.get("api/messages", MessageController.index);
router.post("api/messages", MessageController.store);
router.put("api/messages", MessageController.update);
router.delete("api/messages", MessageController.delete);
