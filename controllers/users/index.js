const { registerController } = require("./registerController");
const { loginController } = require("./loginController");
const { logoutController } = require("./logoutController");
const { currentUserController } = require("./currentUserController");
const { updateSubscriptionController } = require("./updateSubscriptionController");
const { updateAvatarController } = require("./updateAvatarController");

module.exports = {
  registerController,
  loginController,
  logoutController,
  currentUserController,
  updateSubscriptionController,
  updateAvatarController
};
