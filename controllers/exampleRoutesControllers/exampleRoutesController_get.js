const exampleRoutesController_get = async (req, res) => {
  try {
    res.status(200).json({
      message: "Example get",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error getting example",
      error: error,
    });
  }
};

module.exports = exampleRoutesController_get;
