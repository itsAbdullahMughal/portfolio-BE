const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
require("dotenv").config();

const allowedOrigins =
  typeof process.env?.ALLOWED_ORIGINS === "string"
    ? process.env?.ALLOWED_ORIGINS?.split(",")
    : [];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  //origin: true, // make origin true to allow all origins
  methods: "GET,POST,PUT,PATCH,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true, // Allow cookies to be sent
};

module.exports = (app) => {
  app.use(cors(corsOptions));
  app.use(morgan("dev"));
  app.use(express.json());
};
