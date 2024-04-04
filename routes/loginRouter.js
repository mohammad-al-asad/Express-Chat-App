const express = require("express");
const { getLogin, login, logout } = require("../controllers/loginController");
const decorateHtml = require("../middlewaers/common/decorateHtml");
const {
  validators,
  validationHandler,
} = require("../middlewaers/login/addValidator");
const {redirectLogin} = require("../middlewaers/common/checkLogin")


const title = "Login";

const router = express.Router();

router.get("/", redirectLogin, decorateHtml(title), getLogin);
router.post("/", decorateHtml(title), validators, validationHandler, login);

router.delete("/", logout);

module.exports = router;
