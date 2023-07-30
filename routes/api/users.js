const express = require("express");
const { middlewareUsers, middlewareAuth } = require("../../middlewares");
const router = express.Router();

const {
  registerController,
  loginController,
  logoutController,
  currentUserController,
} = require("../../controllers/users");

router.post("/register", middlewareUsers, registerController);
router.post("/login", middlewareUsers, loginController);
router.post("/logout", middlewareAuth, logoutController);
router.get("/current", middlewareAuth, currentUserController);

module.exports = router;
