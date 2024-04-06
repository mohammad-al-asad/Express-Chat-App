const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    creator: {
      id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
    },
    participant: {
      id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const conversationModel = mongoose.model("Conversation", schema);

module.exports = conversationModel;
