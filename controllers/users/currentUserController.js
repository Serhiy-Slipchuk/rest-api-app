const { User} = require("../../models/user")
const currentUserController = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);

    if (!user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { currentUserController };
