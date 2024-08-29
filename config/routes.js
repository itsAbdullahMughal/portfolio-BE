module.exports = (app) => {
  app.use("/api", require("../routes/additionalRoutes"));
};
