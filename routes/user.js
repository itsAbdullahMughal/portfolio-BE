const userController_create = require("../controllers/userControllers/userController_create");
const userController_login = require("../controllers/userControllers/userController_login");
const userController_OTPLogin = require("../controllers/userControllers/userController_OTPLogin");
const userController_patchName = require("../controllers/userControllers/userController_patchName");
const userController_patchPassword = require("../controllers/userControllers/userController_patchPassword");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/create", (req, res) => userController_create);
router.post("/login", (req, res) => userController_login);
router.post("/otp", (req, res) => userController_OTPLogin);
router.patch("/name", auth, (req, res) => userController_patchName);
router.patch("/password", auth, (req, res) => userController_patchPassword);

module.exports = router;
