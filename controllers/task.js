const models = require("../models");

exports.getTasks = (req, res, next) => {
    if (!req.session.login) {
        res.redirect('/auth/signin/')
    } else {
        models.Task.index()
        .then((tasks) => {
            res.render("list", {tasks:tasks});
          })
          .catch((err) => {
            res.render("list", {tasks:{error:err.message}});
          });
    }
}


exports.createTask = async (req, res, next) => {
    res.render("create");
};

exports.store = async (req, res, next) => {
    let params = req.body;
    models.Task.store(params)
      .then((result) => {
        res.redirect("/task/" + result.insertId);
      })
      .catch((err) => {
        res.render("list", {tasks:{error:err.message}});
      });
};

exports.showTask = async (req, res, next) => {
    models.Task.findOne(req.params.id)
    .then((task) => {
      res.render("task", {task: task});
    })
    .catch((err) => {
      res.render("list", {tasks: {error:err.message}});
    });
};  

exports.editTask = async (req, res, next) => {
    models.Task.findOne(req.params.id)
    .then((task) => {
      res.render("edit", {task: task});
    })
    .catch((err) => {
      res.render("list", {tasks: {error:err.message}});
    });
};  
exports.updateTask = async (req, res, next) => {
    let params = req.body;
    models.Task.update(params)
      .then((result) => {
        res.redirect("/task/" + params.id);
      })
      .catch((err) => {
        res.render("list", {tasks: {error:err.message}});
      });
};  

exports.deleteTask = async (req, res, next) => {
    models.Task.destroy(req.params.id)
    .then((task) => {
      res.redirect("/");
    })
    .catch((err) => {
        res.render("list", {task: {error:err.message}});
    });
}; 