const express = require("express");
const {
  getInbox,
  searchUsers,
  createConversation,
  deleteConversation,
  sendMessage,
  getMessage,
} = require("../controllers/inboxController");
const decorateHtml = require("../middlewaers/common/decorateHtml");
const { checkLogin } = require("../middlewaers/common/checkLogin");
const attachmentUploader = require("../middlewaers/inbox/attachmentUploader");

const router = express.Router();

router.get("/", decorateHtml("Inbox"), checkLogin, getInbox);
router.post("/search", checkLogin, searchUsers);
router.post("/conversation", checkLogin, createConversation);
router.delete("/conversation/:conversationId", checkLogin, deleteConversation);
router.get("/messages/:conversationId", checkLogin, sendMessage);

router.post("/message", checkLogin, attachmentUploader, getMessage);

module.exports = router;
