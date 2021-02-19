const path = require("path");
const config = require("./config");
const router = require("./routers");
const express = require("express");
const cookieParser = require("cookie-parser");
const connection = require("./models/DBConnection");
const models = require("./models");
const templating = require("consolidate");
const handlebars = require("handlebars");
const app = express();
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

const poolConnection = connection.poolConnection;
app.use(cookieParser());


templating.requires.handlebars = handlebars;
app.engine("hbs", templating.handlebars);
app.set("views", path.join(__dirname, "/views"));
app.set('view engine', 'ejs');

handlebars.registerHelper(
  "selectedPriority",
  function (option, currentPriority) {
    return option === currentPriority;
  }
);

const session = require("express-session");
const sessionStore = new (require("express-mysql-session")(session))(
  {},
  poolConnection
);

const sessionMiddleware = session({
  store: sessionStore,
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 600000 },
});

app.use(sessionMiddleware);

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: config.config.googleClientID,
      clientSecret: config.config.googleClientSecret,
      callbackURL: "http://localhost:3000/auth/googleCallback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      let user = await models.User.findOrCreateGoogle(profile);
      return cb(null, user);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user.login);
});

passport.deserializeUser(function (login, cb) {
  cb(null, login);
});

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => console.log("Listening on port 3000"));
