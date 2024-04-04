const express = require("express");
const {getUser,addUser, removeUser} = require("../controllers/userController")
const decorateHtml = require("../middlewaers/common/decorateHtml");
const avaterUploader = require("../middlewaers/user/avatarUploader");
const { addValidators, addValidatorsHandler } = require("../middlewaers/user/addValidators");
const {checkLogin} = require("../middlewaers/common/checkLogin");


const router = express.Router();

router.get("/",decorateHtml("User"),checkLogin, getUser);
router.delete("/:id", removeUser);
router.post("/", checkLogin, avaterUploader, addValidators, addValidatorsHandler, addUser);

module.exports = router;
