const express = require("express");
const controllers = require("../controllers");

const router = express.Router();

router.get("/signin/", controllers.auth.getSigninPage);
router.post("/signin/", controllers.auth.signin);
router.get("/logout/", controllers.auth.logout);
router.get("/signup/", controllers.auth.getSignupPage);
router.post("/signup/", controllers.auth.signup);
router.get("/loginByGoogle/", controllers.auth.loginByGoogle);
router.get(
  "/googleCallback/",
  controllers.auth.googleCallback,
  controllers.auth.googleLoggedIn
);

module.exports = router;
