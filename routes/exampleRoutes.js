const exampleRoutesController_get = require("../controllers/exampleRoutesControllers/exampleRoutesController_get");

const router = require("express").Router();

router.get("/", (req, res) => exampleRoutesController_get);

module.exports = router;
