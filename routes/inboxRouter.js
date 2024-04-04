const express = require("express");
const {getInbox} = require("../controllers/inboxController");
const decorateHtml = require("../middlewaers/common/decorateHtml");
const {checkLogin} = require("../middlewaers/common/checkLogin");

const router = express.Router();

router.get("/",decorateHtml("Inbox"),checkLogin, getInbox);

module.exports = router;
