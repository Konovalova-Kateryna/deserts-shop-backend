const path = require("path");
const fs = require("fs/promises");

const { Desert } = require("../models/desert");

const { HttpError, ctrlWrapper } = require("../utils");

const imgDir = path.join(__dirname, "../", "public", "deserts");

const getAll = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Desert.find({}, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  // const result = await Desert.findOne({ _id: id });

  const result = await Desert.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addDesert = async (req, res) => {
  let imageURL = null;

  if (req.file) {
    const { path: tempUpload, originalname } = req.file;
    const resultUpload = path.join(imgDir, originalname);

    await fs.rename(tempUpload, resultUpload);

    imageURL = `/public/deserts/${originalname}`;
    console.log(imageURL);  
  }

  const newDesert = await Desert.create({
    ...req.body,
    ...(imageURL&&{ imageURL }),
  });

  res.status(201).json(newDesert);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Desert.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteDesert = async (req, res) => {
  const { id } = req.params;
  const result = await Desert.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateImg = async (req, res) => {
  const { id } = req.params;

  const desert = await Desert.findById(id);
  if (!desert) {
    throw HttpError(404, "Desert not found");
  }

  if(req.file){
    const { path: tempUpload, originalname } = req.file;
    const resultUpload = path.join(imgDir, originalname);

    await fs.rename(tempUpload, resultUpload);

    if(desert.imageURL){
      const oldImagePath=path.join(__dirname, "../", "public", desert.imageURL);
      await fs.unlink(oldImagePath).catch(console.log);
  }

  desert.imageURL = `/public/deserts/${originalname}`;
}  

  await desert.save();
  res.status(200).json(desert);  
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addDesert: ctrlWrapper(addDesert),
  updateById: ctrlWrapper(updateById),
  deleteDesert: ctrlWrapper(deleteDesert),
  updateImg: ctrlWrapper(updateImg),
};
