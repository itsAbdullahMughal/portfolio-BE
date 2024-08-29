const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userController_OTPLogin = async (req, res) => {
  try {
    const { email, OTP } = req.body;
    if (!email || !OTP) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    const jwtExpiry = process.env.JWT_EXPIRY || "1h";
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isOTPValid = await bcrypt.compare(OTP, user.OTP);
    if (!isOTPValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.OTP_expiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: jwtExpiry,
    });
    res.status(200).json({
      message: "Login successful",
      user: { username: user.username, email: user.email },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = userController_OTPLogin;
