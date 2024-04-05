const model = require("../model/people");
const escape = require("../utilities/escape");
const createError = require("http-errors");

function getInbox(req, res, next) {
  res.render("inbox");
}

async function searchUsers(req, res, next) {
  const user = req.body.user;
  const searchChar = user.replace("+88", "");
  const nameRegex = new RegExp(escape(searchChar), "i");
  const numberRegex = new RegExp("^" + escape("+88" + searchChar));
  const emailRegex = new RegExp("^" + escape(searchChar) + "$", "i");

  try {
    if (searchChar !== "") {
      const users = await model.find(
        {
          $or: [
            {
              name: nameRegex,
            },
            {
              number: numberRegex,
            },
            {
              email: emailRegex,
            },
          ],
        },
        "name avatar"
      );
      res.json(users);
    } else {
      throw createError("You must provide valid information to search!");
    }
  } catch (err) {
    res.status(400).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

module.exports = {
  getInbox,
  searchUsers,
};
