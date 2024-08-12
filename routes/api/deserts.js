const express = require("express");
const ctrl = require("../../controllers/deserts");

const validateBody = require("../../middlewares");
const schemas = require("../../schemas/deserts");

const router = express.Router();

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addDesert);

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateById);

router.delete("/:id", ctrl.deleteDesert);

module.exports = router;
