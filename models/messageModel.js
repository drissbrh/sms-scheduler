const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Schedule",
    },
    message_content: {
      type: String,
      required: true,
    },
    dnis: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Recipient",
    },
    message_id: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
