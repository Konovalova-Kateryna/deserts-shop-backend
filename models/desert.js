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
    desctiption: {
      type: String,
      reguired: true,
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
    week: {
      type: Boolean,
      default: false,
    },
    imageURL: {
      type: String,
      required: false,
    },
  },
  { versionKey: false, timestamps: true }
);

desertSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  titleEng: Joi.string(),
  titleUa: Joi.string(),
  desctiption: Joi.string(),
  price: Joi.number(),
  category: Joi.string().valid(...categoryList),
  favorite: Joi.boolean(),
  week: Joi.boolean(),
});

const schemas = { addSchema };

const Desert = model("desert", desertSchema);

module.exports = { Desert, schemas };
