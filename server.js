const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db");
const router = require("./routes/recipientRoutes");

const app = express();
require("dotenv").config({});
connectDB();

app.use(express.json());

app.use("/api/v1/", router);

app.get("/", (req, res) => {
  res.send("Salam Alaikom");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`listening on http://localhost:${PORT}`.bgWhite.black.bold)
);
