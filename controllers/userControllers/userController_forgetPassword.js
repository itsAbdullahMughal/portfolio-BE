const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const transporter = require("../../config/emailConfig");
const passwordGenerator = require("../../routes/passwordGenerator");
const userController_forgetPassword = async (req, res) => {
  try {
    const otpExpiry = process.env.OTP_EXPIRY || "1";
    const { email, question, answer } = req.body;
    const required = [];
    if (!email) {
      required.push("email");
    }
    if (!question) {
      required.push("question");
    }
    if (!answer) {
      required.push("answer");
    }
    if (required.length > 0) {
      return res
        .status(400)
        .json({ message: `All fields are required: ${required.join(", ")}` });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (user.questions.length === 0) {
      return res.status(400).json({ message: "No questions found" });
    }
    const questionIndex = user.questions.findIndex(
      (q) => q.question === question
    );
    if (questionIndex === -1) {
      return res.status(400).json({ message: "Invalid question" });
    }
    if (user.questions[questionIndex].answer !== answer) {
      return res.status(400).json({ message: "Invalid answer" });
    }
    const newPassword = passwordGenerator();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    const mailOptions = {
      from: `PortFolio ${process.env.EMAIL_ADDRESS}`,
      to: updatedUser.email,
      subject: "Password Reset",
      html: `<p>Your new temporary password is: "${newPassword}"</p>
             <p>Please change your password after logging in.</p>`,
    };
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "Password reset successful, please check your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = userController_forgetPassword;
