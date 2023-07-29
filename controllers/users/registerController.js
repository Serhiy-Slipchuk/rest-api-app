const bcrypt = require("bcrypt");

const { User } = require("../../models/user");

const registerController = async (req, res) => {
  try {
    const { password } = req.body;

    const hashPassword = await bcrypt.hash(password, 9);

    const newUser = await User.create({ ...req.body, password: hashPassword });

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
