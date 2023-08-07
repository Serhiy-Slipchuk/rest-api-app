const multer = require("multer");
const { nanoid } = require("nanoid");
const { AppError } = require("../services")
const path = require("path");

const tempDir = path.join(process.cwd(), "tmp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const extention = file.mimetype.split("/")[1];
    const newFileName = `${req.user.id}-${nanoid(10)}.${extention}`;
    cb(null, newFileName);
  },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image") {
        cb(null, true)
    } else {
        cb(new AppError(400, "Upload images only!"), false)
    }
}

const upload = multer({
  storage: multerConfig,
  fileFilter: multerFilter,
  limits: {
    fileSize: 1 * 1024 * 1024
  }
});

const middlewareUploadUserAvatar = upload.single("avatar");

module.exports = middlewareUploadUserAvatar;
