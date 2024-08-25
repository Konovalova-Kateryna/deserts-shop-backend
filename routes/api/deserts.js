const express = require("express");
const ctrl = require("../../controllers/deserts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/desert");

const router = express.Router();

router.get("/", ctrl.getAll);
router.get("/:id", isValidId, ctrl.getById);

router.post(
  "/admin",
  authenticate,
  validateBody(schemas.addSchema),
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

module.exports = router;
