const User = require("../../models/User");

const userController_questions = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email });
    const questions = user.questions;
    const questionsArray = questions.map((question) => question.question);
    res.status(200).json({ questions: questionsArray });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = userController_questions;
