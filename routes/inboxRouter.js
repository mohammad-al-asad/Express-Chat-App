const express = require("express");
const {getInbox, searchUsers} = require("../controllers/inboxController");
const decorateHtml = require("../middlewaers/common/decorateHtml");
const {checkLogin} = require("../middlewaers/common/checkLogin");

const router = express.Router();

router.get("/",decorateHtml("Inbox"),checkLogin, getInbox);
router.post("/search",checkLogin, searchUsers);

module.exports = router;
