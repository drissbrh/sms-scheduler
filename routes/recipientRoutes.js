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
} = require("../controllers/recipientController");

router.route("/sms/:id").get(getStatus);

router.route("/schedules").post(sendSMSToSchedules);
router.route("/schedules").get(getAllSchedules);
router.route("/schedules/:id").get(getScheduleById);
router.route("/messages/schedule").get(getAllMessagesBySchedule);
router.route("/messages").get(getAllMessages);
router.route("/status/:id").get(getStatusById);

module.exports = router;
