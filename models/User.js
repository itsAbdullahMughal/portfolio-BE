const { Schema, model } = require("mongoose");

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  OTP: {
    type: String,
    required: true,
  },
  OTP_expiry: {
    type: Date,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = model("User", schema);
