const express = require("express");
const controllers = require("../../controllers");

const router = express.Router();

const apiTask = controllers.api.task;

router.use(controllers.api.auth.checkJWT);
router.get("/", apiTask.getTasks);
router.get("/:id", apiTask.showTask);
router.post("/", apiTask.store);
router.put("/:id", apiTask.updateTask);
router.delete("/:id", apiTask.deleteTask);

module.exports = router;
