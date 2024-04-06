const express = require("express");
const {
  getInbox,
  searchUsers,
  createConversation,
} = require("../controllers/inboxController");
const decorateHtml = require("../middlewaers/common/decorateHtml");
const { checkLogin } = require("../middlewaers/common/checkLogin");

const router = express.Router();

router.get("/", decorateHtml("Inbox"), checkLogin, getInbox);
router.post("/search", checkLogin, searchUsers);
router.post("/conversation", checkLogin, createConversation);

module.exports = router;
