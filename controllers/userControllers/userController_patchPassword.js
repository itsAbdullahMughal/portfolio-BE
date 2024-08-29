const User = require("../../models/User");

const userController_patchPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Old password and new password are required" });
    }
    const isMatch = await req.user.comparePassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { password: newPassword },
      { new: true }
    );
    res.status(200).json({
      message: "Password updated successfully",
      user: {
        username: updatedUser.username,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = userController_patchPassword;