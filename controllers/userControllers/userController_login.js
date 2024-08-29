const transporter = require("../../config/emailConfig");
const User = require("../../models/User");

const userController_login = async (req, res) => {
  try {
    const otpExpiry = process.env.OTP_EXPIRY || "1";

    const { username, password } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const decryptedPassword = decryptPassword(user.password, passwordKey);
    if (decryptedPassword !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const OTP = Math.floor(100000 + Math.random() * 900000);

    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(OTP.toString(), saltRounds);

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        OTP: hashedOTP,
        OTP_expiry: Date.now() + otpExpiry * 60 * 1000,
      },
      { new: true }
    );

    const mailOptions = {
      from: `PortFolio ${process.env.EMAIL_ADDRESS}`,
      to: updatedUser.email,
      subject: "Email Verification",
      text: `Dear ${updatedUser.username}, Your one time password (OTP) is "${OTP}"`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Please check your email for OTP",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = userController_login;
