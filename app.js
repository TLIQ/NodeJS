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

const http = require('http').createServer(app);

const io = require('socket.io')(http);

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

var clients = [];
app.use(sessionMiddleware);

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

io.on('connection', socket => {
  if (!socket.request.session || !socket.request.session.username) {
    console.log("Unauthorized user connected!");
    socket.disconnect();
  }

  console.log("Chat user connected:", socket.request.session.username);
  if (!clients.includes(socket.request.session.username)){
    clients.push(socket.request.session.username);
  }
  io.emit('userList', clients);

  socket.on('disconnect', () => {
    const client = clients.indexOf(socket.request.session.username);
    if (client > -1) {
      clients.splice(client, 1);
    }
    io.emit('userList', clients);

    console.log("Chat user connected:", socket.request.session.username);
  })

  socket.on('chatMessage', (data) => {
    console.log("Chat message from ", socket.request.session.username + ":", data);
    data.message = socket.request.session.username + " : " + data.message;
    io.emit('chatMessage', data);
  })
});

const middlewares = require('./middlewares');
app.use(middlewares.logSession);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

http.listen(3000, () => console.log("Listening on port 3000"));
