const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { User } = require("../../models/user");

const registerController = async (req, res) => {
  try {
    const { password, email } = req.body;

    const hashPassword = await bcrypt.hash(password, 9);

    const hashEmail = crypto.createHash("md5").update(email).digest("hex");
    const avatar = `https://www.gravatar.com/avatar/${hashEmail}.jpg?d=identicon`;

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL: avatar });

    res.status(201).json({
      status: 201,
      message: "Success",
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(409)
        .json({ message: `Email ${error.keyValue.email} is in use` });
      return;
    }
    res.status(400).json({
      message: `Помилка валідації ${error.message}`,
    });
  }
};

module.exports = { registerController };
