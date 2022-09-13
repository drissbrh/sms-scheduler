const axios = require("axios");
const asyncHandler = require("express-async-handler");
const messageModel = require("../models/messageModel");
const Recipient = require("../models/recipientModel");
const Schedule = require("../models/scheduleModel");
const Status = require("../models/statusModel");

// @desc    Get a message status
// @route   GET /api/v1/:messageId
exports.getStatus = asyncHandler(async (req, res) => {
  const base_Url = "http://kr8tif.lawaapp.com:1338/api";
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const messageId = req.params.id;
  // const checkStatus = await Status.find({ messageId });
  // if (checkStatus) {
  //   res.json("Already checked");
  // }
  const { data } = await axios.get(
    base_Url + `?messageId=${messageId}`,
    config
  );
  if (data) {
    const newStatus = await Status.create({
      message_id: messageId,
      deliveryTime: data.delivery_time,
      status: data.status,
    });

    return res.status(200).json({
      success: true,
      results: data,
    });
  } else {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

// @desc   Add SMS to be sent
// @route  POST /api/
exports.sendSMSToSchedules = asyncHandler(async (req, res) => {
  const base_Url = "http://kr8tif.lawaapp.com:1338/api";
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { dnis, message_content } = req.body;
  const { data } = await axios.post(
    base_Url,
    { dnis, message_content },
    config
  );

  const schedule = await Schedule.create({
    message_content,
    sending_date: Date(),
    dnis,
  });
  const message = await messageModel.create({
    message_id: data.message_id,
    message_content,
    dnis,
    schedule: schedule._id,
  });

  if (schedule) {
    res.status(201).json({
      messageId: data.message_id,
      message_content: schedule.message_content,
      dnis: schedule.dnis,
      sending_date: Date.now(),
    });
  } else {
    res.status(400);
    throw new Error("Invalid schedule data");
  }
});

// @desc    Get Schedule by ID
// @route   GET /api/v1/schedules/:id
exports.getScheduleById = asyncHandler(async (req, res) => {
  const schedule = await Schedule.findById(req.params.id).populate(
    "dnis",
    "name phoneNumber"
  );

  if (schedule) {
    res.status(200).json(schedule);
  } else {
    res.status(404);
    throw new Error("schedule not found");
  }
});

// @desc    Get All Schedules
// @route   GET /api/v1/schedules/
exports.getAllSchedules = asyncHandler(async (req, res) => {
  const schedules = await Schedule.find({}).populate(
    "dnis",
    "name phoneNumber"
  );

  if (schedules) {
    res.status(200).json(schedules);
  } else {
    res.status(404);
    throw new Error("No schedules found");
  }
});

// @desc    Get All messages
// @route   GET /api/v1/messages/
exports.getAllMessages = asyncHandler(async (req, res) => {
  const messages = await messageModel
    .find({})
    .populate("dnis", "name phoneNumber");

  if (messages) {
    res.status(200).json(messages);
  } else {
    res.status(404);
    throw new Error("No messages found");
  }
});

// @desc    Get SMS message by a given schedule
// @route   GET /api/v1/messages?schedule=keyword
exports.getAllMessagesBySchedule = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        schedule: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await messageModel.countDocuments({ ...keyword });
  const messages = await messageModel
    .find({ ...keyword })
    .populate("schedule")
    .populate("dnis", "name phoneNumber");

  if (messages) {
    res
      .status(200)
      .json({ messages, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error("No messages found");
  }
});

// @desc    Get Status by ID
// @route   GET /api/v1/Status/:id
exports.getStatusById = asyncHandler(async (req, res) => {
  const status = await Status.findById(req.params.id);

  if (status) {
    res.json(status);
  } else {
    res.status(404);
    throw new Error("Status not found");
  }
});

// @desc    Get Status by ID
// @route   GET /api/v1/Status/messageId?keyword=
exports.getStatusByMessageId = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        message_id: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Status.countDocuments({ ...keyword });
  const allStatus = await Status.find({ ...keyword });

  if (allStatus) {
    res
      .status(200)
      .json({ allStatus, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error("Status not found");
  }
});
