const express = require("express");
const path = require("path");

const templating = require("consolidate");
const cookieParser = require("cookie-parser");

const handlebars = require("handlebars");
templating.requires.handlebars = handlebars;

const connection = require("./DBConnection");

const poolConnection = connection.poolConnection().promise();

const Task = require("./task");
Task.connection = poolConnection;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("views", path.join(__dirname, "/views"));
app.set('view engine', 'ejs');


app.get("/", (req, res) => {
  Task.index()
    .then((tasks) => {
      res.render("index", {tasks:tasks});
    })
    .catch((err) => {
      res.render("index", {tasks:{error:err.message}});
    });
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.post("/store", (req, res) => {
  let params = req.body;
  Task.store(params)
    .then((result) => {
      res.redirect("/task/" + result.insertId);
    })
    .catch((err) => {
      res.render("index", {tasks:{error:err.message}});
    });
});

app.get("/task/:id", (req, res) => {
  Task.findOne(req.params.id)
    .then((task) => {
      res.render("task", {task: task});
    })
    .catch((err) => {
      res.render("index", {task: {error:err.message}});
    });
});

app.get("/edit/:id", (req, res) => {
  Task.findOne(req.params.id)
    .then((task) => {
      res.render("edit", {task: task});
    })
    .catch((err) => {
      res.render("index", {task: {error:err.message}});
    });
});

app.post("/update", (req, res) => {
  let params = req.body;
  Task.update(params)
    .then((result) => {
      res.redirect("/task/" + params.id);
    })
    .catch((err) => {
      res.render("index", {task: {error:err.message}});
    });
});

app.post("/delete/:id", (req, res) => {
  Task.destroy(req.params.id)
    .then((task) => {
      res.redirect("/");
    })
    .catch((err) => {
        res.render("index", {task: {error:err.message}});
    });
});

app.listen(3000, () => console.log("Listening on port 3000"));