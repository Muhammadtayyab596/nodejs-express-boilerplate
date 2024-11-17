const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/");
const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

app.use("/api/v1/", routes);

app.use(errorMiddleware);

module.exports = app;
