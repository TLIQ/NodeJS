
const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.js'));
router.use('/tasks', require('./tasks.js'));

module.exports = router;



// app.get("/main", (req, res) => {
//     Task.index()
//       .then((tasks) => {
//         res.render("list", {tasks:tasks});
//       })
//       .catch((err) => {
//         res.render("list", {tasks:{error:err.message}});
//       });
//   });
  
//   app.get("/create", (req, res) => {
//       res.render("create");
//   });
  
//   app.post("/store", (req, res) => {
//     let params = req.body;
//     Task.store(params)
//       .then((result) => {
//         res.redirect("/task/" + result.insertId);
//       })
//       .catch((err) => {
//         res.render("list", {tasks:{error:err.message}});
//       });
//   });
  
//   app.get("/task/:id", (req, res) => {
//     Task.findOne(req.params.id)
//       .then((task) => {
//         res.render("task", {task: task});
//       })
//       .catch((err) => {
//         res.render("list", {task: {error:err.message}});
//       });
//   });
  
//   app.get("/edit/:id", (req, res) => {
//     Task.findOne(req.params.id)
//       .then((task) => {
//         res.render("edit", {task: task});
//       })
//       .catch((err) => {
//         res.render("list", {task: {error:err.message}});
//       });
//   });
  
//   app.post("/update", (req, res) => {
//     let params = req.body;
//     Task.update(params)
//       .then((result) => {
//         res.redirect("/task/" + params.id);
//       })
//       .catch((err) => {
//         res.render("list", {task: {error:err.message}});
//       });
//   });
  
//   app.post("/delete/:id", (req, res) => {
//     Task.destroy(req.params.id)
//       .then((task) => {
//         res.redirect("/");
//       })
//       .catch((err) => {
//           res.render("list", {task: {error:err.message}});
//       });
//   });
  