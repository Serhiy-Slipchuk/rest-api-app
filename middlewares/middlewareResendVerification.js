const { resendVerificationJoiSchema } = require("../models/user");

const middlewareResendVerification = async (req, res, next) => {
  try {
    await resendVerificationJoiSchema.validateAsync(req.body);

    next();
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: `Помилка валідації Joi: ${error.message}` });
  }
};

module.exports = middlewareResendVerification;
