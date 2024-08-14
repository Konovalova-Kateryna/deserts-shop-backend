const { Desert } = require("../models/desert");

const { HttpError } = require("../utils");

const getAll = async (req, res, next) => {
  try {
    const result = await Desert.find({}, "-createdAt -updatedAt");
    // const result = await Desert.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const result = await Desert.findOne({ _id: id });

    const result = await Desert.findById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addDesert = async (req, res, next) => {
  try {
    const result = await Desert.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Desert.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteDesert = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Desert.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  addDesert,
  updateById,
  deleteDesert,
};
