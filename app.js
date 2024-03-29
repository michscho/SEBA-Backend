const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const contentItemsRoutes = require("./api/routes/contentItem");
const coursesRoutes = require("./api/routes/course");
const userRoutes = require('./api/routes/user');
const commentRoutes = require('./api/routes/comment');


mongoose.connect(
  "mongodb+srv://test-user:" +
    process.env.MONGO_ATLAS_PW +
    "@sandbox-mmakc.mongodb.net/KnowMoreDB?retryWrites=true&w=majority");
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/contentItems", contentItemsRoutes);
app.use("/courses", coursesRoutes);
app.use("/user", userRoutes);
app.use("/comment", commentRoutes);

app.use("/",(req, res, next) => {
  res.status(200).json({
    message: "Backend online"
  });
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
