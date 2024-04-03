const { check, validationResult } = require("express-validator");
const User = require("../../model/people");
const createHttpError = require("http-errors");
const { unlink } = require("fs");
const path = require("path");

const addValidators = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createHttpError("Email already exists");
        }
      } catch (err) {
        throw createHttpError(err.message);
      }
    }),
  check("number")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage("Mobile number must be bangladeshi valid mobile number")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ number: value });
        if (user) {
          throw createHttpError("Mobile number already exists");
        }
      } catch (err) {
        throw createHttpError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
];

function addValidatorsHandler(req, res, next) {
  const validatorsError = validationResult(req);
  const mappedValidatorsError = validatorsError.mapped();
  if (Object.keys(mappedValidatorsError).length === 0) {
    next();
  } else {
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(`${__dirname}/../../../public/uploads/avatars/${filename}`),
        (err) => {
          console.log(err);
        }
      );
    }
    
    res.status(500).json({
      errors: mappedValidatorsError,
    });
  }
}

module.exports = {
  addValidators,
  addValidatorsHandler,
};
