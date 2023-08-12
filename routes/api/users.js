const express = require("express");
const {
  middlewareUsers,
  middlewareAuth,
  middlewareUserSubcription,
  middlewareUploadUserAvatar,
  middlewareResendVerification
} = require("../../middlewares");
const router = express.Router();

const {
  registerController,
  loginController,
  logoutController,
  currentUserController,
  updateSubscriptionController,
  updateAvatarController,
  verificationController,
  resendVerificationController
} = require("../../controllers/users");

router.patch("/", middlewareAuth, middlewareUserSubcription, updateSubscriptionController);
router.post("/register", middlewareUsers, registerController);
router.post("/login", middlewareUsers, loginController);
router.post("/logout", middlewareAuth, logoutController);
router.get("/current", middlewareAuth, currentUserController);
router.patch("/avatars", middlewareAuth, middlewareUploadUserAvatar, updateAvatarController);
router.get("/verify/:verificationToken", verificationController);
router.post("/verify", middlewareResendVerification, resendVerificationController)

module.exports = router;
