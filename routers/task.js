const express = require("express");
const controllers = require("../controllers");

const router = express.Router();

router.get('/main/', controllers.task.getTasks);
router.get('/create/', controllers.task.createTask);
router.post('/store/', controllers.task.store);
router.get('/task/:id/', controllers.task.showTask);
router.get('/edit/:id', controllers.task.editTask);
router.post('/update', controllers.task.updateTask);
router.post('/delete/:id/', controllers.task.deleteTask);

module.exports = router;