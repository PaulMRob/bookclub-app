const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const { expressjwt } = require("express-jwt");
const path = require("path");

require("dotenv").config();

//Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "client", "build")));

//Connect to DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((dbErr) => {
    console.log("Connection to database failed:", dbErr.message);
  });

//Routes
app.use("/auth", require("./routes/authRouter"));
app.use(
  "/api",
  expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] })
);
app.use("/api/bookpost", require("./routes/bookpostRouter"));
app.use("/api/discussion", require("./routes/discussionRouter"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(9000, () => {
  console.log(`Server is running on local port 9000`);
});
