const jwt = require("jsonwebtoken");
const model = require("../model/people");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

function getLogin(req, res, next) {
  res.render("login");
}

async function login(req, res, next) {
  try {
    const user = await model.findOne({
      $or: [{ email: req.body.username }, { number: req.body.username }],
    });

    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        const userObj = {
          id: user._id,
          name: user.name,
          number: user.number,
          email: user.email,
          role: "user",
        };
        const token = jwt.sign(userObj, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });

        res.cookie(process.env.COOKIE_NAME, token, {
          maxage: process.env.JWT_EXPIRE,
          httpOnly: true,
          signed: true,
        });

        res.locals.loggedInUser = userObj;
        res.render("inbox");
      } else {
        throw createError("Login failed! Please try again.");
      }
    } else {
      throw createError("Login failed! Please try again.");
    }
  } catch (err) {
    res.render("login", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

function logout(req, res, next) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("Logged out");
}

module.exports = {
  getLogin,
  login,
  logout,
};
