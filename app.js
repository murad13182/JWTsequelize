const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes/user.route");
const path = require("path");
require("dotenv").config();
const cors = require('cors')

// app.use(express.static(path.join(__dirname, '/public')))
// app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

app.use("/api", routes);

module.exports = app;
