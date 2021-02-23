const jwt = require("jsonwebtoken");

const models = require("../../models");
const config = require("../../config");

exports.login = async (req, res, next) => {
  const user = await models.User.findByLogin(req.body.login);
  if (!user) {
    res.status(403).json({ status: "error", message: "Неправильный логин" });
    return;
  }
  if (!(await user.checkPassword(req.body.password))) {
    res.status(403).json({ status: "error", message: "Неправильный пароль" });
    return;
  }
  const token = jwt.sign({ login: req.body.login }, config.jwt.jwtSecret, config.jwt.jwtOptions);
  res.json({ status: "ok", token });
};

exports.signup = async (req, res, next) => {
  const user = new models.User();
  user.fill(req.body);

  try {
    let result = await user.save();
    if (result) {
      res.json({ status: "ok" });
    } else {
      res.status(403).json({status: "error"});
    }
  } catch (error) {
    res.status(403).json({ status: "error", message: error.message });
  }
};

exports.checkJWT = (req, res, next) => {
  if (!req.body.token) {
    res.status(403).json({ Error: "Ошибка"});
    return;
  }
  try {
    const token = jwt.verify(req.body.token, config.jwt.jwtSecret);
    if (!token || !token.login) {
      res.status(403).json({ Error: "Ошибка"});
    } else {
      next();
    }
  } catch (err) {
    console.log(err.message);
    res.status(403).json({ Error: "Ошибка"});
  }
};
