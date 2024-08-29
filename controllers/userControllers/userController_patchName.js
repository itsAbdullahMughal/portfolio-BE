const User = require("../../models/User");

const userController_patchName = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: "username is required" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { username },
      { new: true }
    );

    res.status(200).json({
      message: "Username updated successfully",
      user: { username: updatedUser.username, email: updatedUser.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = userController_patchName;
