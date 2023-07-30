const { User } = require("../../models/user");

const updateSubscriptionController = async (req, res) => {
  const { _id } = req.user;
  const newSubscription = req.body.subscription;

  try {
    const user = await User.findByIdAndUpdate(
      _id,
      { subscription: newSubscription },
      { new: true }
    );

    await user.save();

    if (!user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { updateSubscriptionController };
