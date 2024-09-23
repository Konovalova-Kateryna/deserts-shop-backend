const express = require("express");
const ctrl = require("../../controllers/deserts");

const {
  validateBody,
  isValidId,
  authenticate,
  // upload,
} = require("../../middlewares");
const { schemas } = require("../../models/desert");

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

const router = express.Router();

router.get("/", ctrl.getAll);
router.get("/:id", isValidId, ctrl.getById);

router.post(
  "/admin",
  authenticate,
  validateBody(schemas.addSchema),
  upload.single("image"),
  ctrl.addDesert
);

router.put(
  "/admin/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.delete("/admin/:id", authenticate, isValidId, ctrl.deleteDesert);

router.patch("/admin/:id", authenticate, ctrl.updateImg);

module.exports = router;
