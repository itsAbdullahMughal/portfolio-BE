const bcrypt = require("bcrypt");
const User = require("../../models/User");
const transporter = require("../../config/emailConfig");

const userController_create = async (req, res) => {
  try {
    const otpExpiry = process.env.OTP_EXPIRY || "1";

    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const OTP = Math.floor(100000 + Math.random() * 900000);
    const hashedOTP = await bcrypt.hash(OTP.toString(), saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      OTP: hashedOTP,
      OTP_expiry: Date.now() + otpExpiry * 60 * 1000,
    });
    const savedUser = await newUser.save();

    const mailOptions = {
      from: `PortFolio ${process.env.EMAIL_ADDRESS}`,
      to: newUser.email,
      subject: "Email Verification",
      text: `Dear ${savedUser.username}, Your one time password (OTP) is "${OTP}"`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "User created successfully, please check your email for OTP",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = userController_create;
