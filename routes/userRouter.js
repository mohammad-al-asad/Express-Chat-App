const express = require("express");
const {getUser} = require("../controllers/userController")
const decorateHtml = require("../middlewaers/common/decorateHtml");


const router = express.Router();

router.get("/",decorateHtml("User"), getUser);

module.exports = router;
