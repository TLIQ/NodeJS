const express = require("express");
const controllers = require("../../controllers");

const router = express.Router();

const apiAuth = controllers.api.auth;

router.post('/', apiAuth.login);
router.post('/signup', apiAuth.signup);

module.exports = router;