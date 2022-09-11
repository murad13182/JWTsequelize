const app = require("./app");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
require("./config/database");
const express = require("express");
const port = 8000;
require("dotenv").config();

// |||||||||||||||||||||||||||||||||||||||||||||||||||||SYNC ALL THE MODEL SCHEMAS|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
const db = require("./models");
// db.sequelize.sync();
db.sequelize
  .sync()
  .then((result) => {
    app.listen(port, () => {
      logger.info(`Server is up at : ${port}`);
    });
  })
  .catch((err) => {
    console.log("error while connecting with database");
  });
