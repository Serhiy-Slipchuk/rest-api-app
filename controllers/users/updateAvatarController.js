const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../../models/user");

const updateAvatarController = async (req, res) => {
  try {
    const { _id } = req.user;

    const avatarsDir = path.join(process.cwd(), "public", "avatars");
    const { path: tempUpload, filename } = req.file;
    const resultUpload = path.join(avatarsDir, filename);

    const image = await Jimp.read(tempUpload);
    image.resize(250, 250);
    image.quality(90);
    image.write(resultUpload);

    await fs.unlink(tempUpload);
    
    const avatarURL = path.join(process.env.BACKEND_HOST, "avatars", filename);
    await User.findByIdAndUpdate(_id, {avatarURL})

    const oldPathAvatarUrl = req.user.avatarURL.split("\\")
    if (oldPathAvatarUrl[1] === process.env.BACKEND_HOST.split("//")[1]) {
        try {
            await fs.unlink(path.join(avatarsDir, oldPathAvatarUrl[3]))
        } catch (err) {
            console.log(err.message)
        }
    }
   
    res.status(200).json({ avatarURL });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { updateAvatarController };
