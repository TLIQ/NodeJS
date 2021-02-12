const express = require("express");
const path = require("path");

const templating = require("consolidate");
// let template = require('ejs');
const cookieParser = require("cookie-parser");
const handlebars = require("handlebars");
templating.requires.handlebars = handlebars;

const news = require("./news.js");
// const cons = require("consolidate");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.engine("hbs", templating.handlebars);
app.set("views", "./views");
// app.set("view engine", "hbs");
app.set('view engine', 'ejs');

handlebars.registerHelper(
  "selectedNewsType",
  function (cookieValue, currentNewsType) {
    return cookieValue && cookieValue === currentNewsType;
  }
);

const router = express.Router();

app.use("/", router);

router.route("/").get(function(req, res) {
    res.redirect("/news");
});

router.route("/news/selected/back").get(function(req, res) {
    res.redirect("/news");
});

router.get("/news", (req, res) => {
    let cookies = req.cookies;
    let data = news.news;
  res.render("index", {data:data, cookies: cookies});
});

router.post("/news/selected", (req, res) => {
  let category = req.body;
  
  
  
  res.cookie("news", category);
    getNewsForCategory (res, category);
});

async function getNewsForCategory (res, category) {
    let result = await news.getNews(category);
    if (result) {
        res.render("news", {result});
    } else {
        res.status(500).render("selectedNews", {massage: "Произошла ошибка",});
    }
  }


app.listen(3000, () => console.log("Listening on port 3000"));