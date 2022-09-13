const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema(
  {
    dnis: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Recipient",
    },
    message_content: {
      type: String,
      required: true,
    },
    sending_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", ScheduleSchema);
