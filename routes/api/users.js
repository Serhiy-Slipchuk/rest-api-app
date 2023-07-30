const express = require("express");
const { middlewareUsers, middlewareAuth, middlewareUserSubcription } = require("../../middlewares");
const router = express.Router();

const {
  registerController,
  loginController,
  logoutController,
  currentUserController,
  updateSubscriptionController,
} = require("../../controllers/users");

router.patch("/", middlewareAuth, middlewareUserSubcription, updateSubscriptionController);
router.post("/register", middlewareUsers, registerController);
router.post("/login", middlewareUsers, loginController);
router.post("/logout", middlewareAuth, logoutController);
router.get("/current", middlewareAuth, currentUserController);

module.exports = router;
