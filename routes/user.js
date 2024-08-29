const userController_create = require("../controllers/userControllers/userController_create");
const userController_forgetPassword = require("../controllers/userControllers/userController_forgetPassword");
const userController_login = require("../controllers/userControllers/userController_login");
const userController_OTPLogin = require("../controllers/userControllers/userController_OTPLogin");
const userController_patchName = require("../controllers/userControllers/userController_patchName");
const userController_patchPassword = require("../controllers/userControllers/userController_patchPassword");
const userController_questions = require("../controllers/userControllers/userController_questions");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/create", userController_create);
router.post("/login", userController_login);
router.post("/otp", userController_OTPLogin);
router.post("/forgetPassword", userController_forgetPassword);
router.post("/questions", userController_questions);
router.patch("/name", auth, userController_patchName);
router.patch("/password", auth, userController_patchPassword);

module.exports = router;
