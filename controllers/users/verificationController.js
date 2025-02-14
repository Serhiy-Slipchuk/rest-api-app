const { User } = require("../../models/user");

const verificationController = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user || user.verify) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  res.status(200).json({ message: "Verification successful!" });
};

module.exports = { verificationController };
