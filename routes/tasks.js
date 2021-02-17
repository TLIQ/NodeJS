const express = require("express");
const controllers = require("../controllers");

const router = express.Router();

router.get('/main/', controllers.tasks.getTasks);
router.get('/create/', controllers.tasks.createTask);
router.post('/store/', controllers.tasks.store);
router.get('/task/:id/', controllers.tasks.showTask);
router.get('/edit/:id', controllers.tasks.editTask);
router.post('/update', controllers.tasks.updateTask);
router.post('/delete/:id/', controllers.tasks.deleteTask);

module.exports = router;