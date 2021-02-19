const cons = require("consolidate");
const Cookies = require("cookies");
const passport = require("passport");
const models = require("../models");

const getSigninPage = (req, res, next) => {
  var cookies = new Cookies(req, res);
  let login = cookies.get("login");
  let params = {};
  if (login) {
    params.login = login;
  }

  res.render("login", params);
};

const signin = async (req, res, next) => {
  let login = req.body.login;
  const user = await models.User.findByLogin(login);

  if (!user) {
    res.render("login", { message: "Неправильный логин" });
    return;
  }

  if (!user.checkPassword(req.body.password)) {
    res.render("login", { message: "Неправильный пароль" });
    return;
  }

  var cookies = new Cookies(req, res);

  if (req.body.rememberMe) {
    cookies.set("login", login);
  } else {
    cookies.set("login");
  }

  req.session.login = req.body.login;

  res.redirect("/tasks/main");
};

const getSignupPage = async (req, res, next) => {
  res.render("signup");
};

const signup = async (req, res, next) => {
  const user = new models.User();

  user.fill(req.body);
  let result = await user.save();

  if (result) {
    await signin(req, res, next);
  } else {
    let params = { message: "Ошибка при создании пользователя" };
    res.render("signup", params);
  }
};

const logout = async (req, res, next) => {
  req.logout();
  req.session.destroy(() => {
    res.redirect("/");
  });
};

const loginByGoogle = passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/gbnodejs"],
});

const googleCallback = passport.authenticate("google", {
  failureRedirect: "/login",
});

const googleLoggedIn = async (req, res, next) => {
  req.session.login = req.user.login;
  res.redirect("/tasks/main");
};


module.exports = {
  getSigninPage,
  signin,
  getSignupPage,
  signup,
  logout,
  loginByGoogle,
  googleCallback,
  googleLoggedIn,
};
