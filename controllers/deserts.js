const deserts = require("../models/deserts");

const { HttpError } = require("../utils");

const getAll = async (req, res, next) => {
  try {
    const result = await deserts.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deserts.getById(id);
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
    const result = await deserts.add(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deserts.updateById(id, req.body);
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
    const result = await deserts.deleteById(id);
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
