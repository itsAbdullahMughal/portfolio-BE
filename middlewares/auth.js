const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = async (req, res, next) => {
  try {
    const tokenName = req.headers?.authorization?.split(" ")[0];
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }
    if (tokenName !== "Bearer") {
      return res.status(401).json({ message: "Invalid token type" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expired" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = auth;
