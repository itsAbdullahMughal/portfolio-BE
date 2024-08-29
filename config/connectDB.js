const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async (app) => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `Server is running on http://localhost:${process.env.PORT || 8000}/`
      );
    });
  } catch (error) {
    if (
      error?.message?.includes(
        'The `uri` parameter to `openUri()` must be a string, got "undefined".'
      )
    ) {
      console.log("Please add the MONGODB_URI in the .env file");
      return;
    }
    console.log(error);
  }
};
