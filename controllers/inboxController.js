const model = require("../model/people");
const conversationModel = require("../model/conversation");
const escape = require("../utilities/escape");
const createError = require("http-errors");
const moment = require("moment");

async function getInbox(req, res, next) {
  try {
    const conversations = await conversationModel.find({
      $or: [
        {
          "creator.id": req.loggedInUser.id,
        },
        {
          "participant.id": req.loggedInUser.id,
        },
      ],
    });

    res.render("inbox", {
      conversations: conversations,
      moment: moment,
    });
  } catch (err) {
    next(err);
  }
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
      const newusers = users.filter((user) => {
        return user._id != req.loggedInUser.id;
      });
      res.json(newusers);
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

async function createConversation(req, res, next) {
  try {
    const participant = req.body.participant;

    const conversation = new conversationModel({
      creator: {
        id: req.loggedInUser.id,
        name: req.loggedInUser.name,
        avatar: req.loggedInUser.avatar || null,
      },
      participant: {
        id: participant.id,
        name: participant.name,
        avatar: participant.avatar,
      },
    });

    const allConversation = await conversationModel.find();
    let equal = false;
    allConversation.forEach((element) => {
      if (
        element.creator.name == conversation.creator.name &&
        element.participant.name == conversation.participant.name
      ) {
        equal = true;
      }
    });

    if (!equal) {
      const result = conversation.save();
      res.status(200).json({
        message: "Conversation created succesfully",
      });
    } else {
      throw createError("Conversation already exists");
    }
  } catch (err) {
    res.status(500).json({
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
  createConversation,
};
