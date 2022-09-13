const express = require("express");
const router = express.Router();
const {
  getStatus,
  sendSMSToSchedules,
  getScheduleById,
  getStatusById,
  getAllSchedules,
  getAllMessages,
  getAllMessagesBySchedule,
  getStatusByMessageId,
} = require("../controllers/recipientController");

//Check SMS status by messageId
router.route("/sms/:id").get(getStatus);

//Send SMS to recipients
router.route("/schedules").post(sendSMSToSchedules);

//Get All schedules that are already sent
router.route("/schedules").get(getAllSchedules);

//Get A schedule by Id
router.route("/schedules/:id").get(getScheduleById);

//Get a message by its schedule
router.route("/messages/schedule").get(getAllMessagesBySchedule);

//Get all messages sent
router.route("/messages").get(getAllMessages);

//get Message Status by Id
router.route("/status/:id").get(getStatusById);

//get Message Status by messageId
router.route("/status/messageId").get(getStatusByMessageId);

module.exports = router;
