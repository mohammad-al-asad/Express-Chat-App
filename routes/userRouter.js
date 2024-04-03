const express = require("express");
const {getUser,addUser, removeUser} = require("../controllers/userController")
const decorateHtml = require("../middlewaers/common/decorateHtml");
const avaterUploader = require("../middlewaers/user/avatarUploader");
const { addValidators, addValidatorsHandler } = require("../middlewaers/user/addValidators");


const router = express.Router();

router.get("/",decorateHtml("User"), getUser);
router.delete("/:id", removeUser);
router.post("/",avaterUploader, addValidators, addValidatorsHandler, addUser);

module.exports = router;
