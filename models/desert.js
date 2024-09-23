const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");

const Joi = require("joi");

const categoryList = ["macaroons", "donates", "cupcakes"];

const desertSchema = new Schema(
  {
    titleEng: {
      type: String,
      required: true,
    },
    titleUa: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: categoryList,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    imageURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

desertSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  titleEng: Joi.string().required(),
  titleUa: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string()
    .valid(...categoryList)
    .required(),
  favorite: Joi.boolean(),
});

const schemas = { addSchema };

const Desert = model("desert", desertSchema);

module.exports = { Desert, schemas };
