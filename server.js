const cors = require("cors");
const express = require("express");
const multer = require("multer");
const axios = require("axios");
require("express-async-errors");
const expressValidator = require("express-validator");
const path = require("path");

const fs = require("fs");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 8085;

const { errorHandler } = require("./helper/dbErrorHandler");
const logger = require("./helper/logger");
const { connectToDatabase } = require("./helper/dbConnection");
connectToDatabase();

logger(app);
app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to Medicine ai Home backend");
});

app.use("/api/auth-user", require("./router/auth-user"));
app.use("/api/checkmedicine", require("./router/checkmedicine.js"));

async function startServer() {
  app.listen(port, () => {
    console.log(
      `Server is running on port ${port} at ${process.env.NODE_ENV} mode`
    );
  });
}

app.use(function (err, req, res, next) {
  return res.status(500).json({
    error: errorHandler(err) || "Something went wrong! ****SERVER_ERROR****",
  });
});

// to start the above function
startServer();
