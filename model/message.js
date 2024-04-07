const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    text: {
      type: String,
    },
    attachment: [
      {
        type: String,
      },
    ],
    sender: {
      id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
    },
    receiver: {
      id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
    },
    conversationId: mongoose.Types.ObjectId,
    time: {
      type: Date,
      default: Date.now,
    },
  },
  { timestmap: true }
);

const messageModel = mongoose.model("message", schema);

module.exports = messageModel;
