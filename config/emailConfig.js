const nodemailer = require("nodemailer");
require("dotenv").config();

const emailAddress = process.env.EMAIL_ADDRESS;
const appEmailPassword = process.env.APP_EMAIL_PASSWORD;
if (!emailAddress) {
  throw new Error("EMAIL_ADDRESS is not defined in the environment variables");
}
if (!appEmailPassword) {
  throw new Error(
    "APP_EMAIL_PASSWORD is not defined in the environment variables"
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailAddress,
    pass: appEmailPassword,
  },
});

module.exports = transporter;
