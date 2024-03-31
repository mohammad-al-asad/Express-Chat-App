const express = require("express");
const {getInbox} = require("../controllers/inboxController");
const decorateHtml = require("../middlewaers/common/decorateHtml");

const router = express.Router();

router.get("/",decorateHtml("Inbox"), getInbox);

module.exports = router;
