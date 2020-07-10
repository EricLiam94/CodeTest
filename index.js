const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const connectMongo = require("./Config/mongo");
const postgres = require("./Config/postgre");
// initiate express
const app = express();

// use Morgan
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

connectMongo();

app.use("/api", require("./Router/order"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server runing on ${PORT}`));
