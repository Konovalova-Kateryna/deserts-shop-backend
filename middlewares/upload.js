const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname); // file.originalname or "new name"
  },
});

const upload = multer({
  storage: multerConfig,
});

exports.module = upload;

