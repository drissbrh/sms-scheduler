const colors = require("colors");
const connectDB = require("./config/db");

require("dotenv").config();

connectDB();
//data
const recipients = require("./data/recipientData");

//message
const messageModel = require("./models/messageModel");
const recipientModel = require("./models/recipientModel");
const scheduleModel = require("./models/scheduleModel");
const statusModel = require("./models/statusModel");

const importData = async () => {
  try {
    await recipientModel.deleteMany();
    await scheduleModel.deleteMany();
    await statusModel.deleteMany();
    await messageModel.deleteMany();

    await recipientModel.insertMany(recipients);
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

importData();
