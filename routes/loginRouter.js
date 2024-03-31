const express = require("express");
const { getLogin } = require("../controllers/loginController");
const decorateHtml = require("../middlewaers/common/decorateHtml");

const router = express.Router();

router.get("/", decorateHtml("Login"), getLogin);

module.exports = router;
