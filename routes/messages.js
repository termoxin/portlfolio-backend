const router = require("../libs/router");
const MessageController = require("../controllers/MessageController");

router.get("messages", MessageController.index);
router.post("messages", MessageController.store);
router.put("messages", MessageController.update);
router.delete("messages", MessageController.delete);
