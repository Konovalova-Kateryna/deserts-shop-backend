const express = require("express");
const ctrl = require("../../controllers/deserts");

const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/desert");

const router = express.Router();

router.get("/", ctrl.getAll);
router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addDesert);

router.put("/:id", isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.delete("/:id", isValidId, ctrl.deleteDesert);

module.exports = router;
