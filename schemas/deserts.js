const Joi = require("joi");

const addSchema = Joi.object({
  titleEng: Joi.string().required(),
  titleUa: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
});

module.exports = { addSchema };
