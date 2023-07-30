const { User } = require("../../models/user");

const logoutController = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findByIdAndUpdate(_id, { token: "" });

    if (!user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { logoutController };
