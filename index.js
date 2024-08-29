const express = require("express");
const middleware = require("./config/middleware");
const routes = require("./config/routes");
const connectDB = require("./config/connectDB");

const app = express();

middleware(app);
routes(app);
connectDB(app)
