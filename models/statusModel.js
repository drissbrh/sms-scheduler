const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema(
  {
    message_id: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: "Message",
    },
    deliveryTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Status", StatusSchema);
