const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const desertsPath = path.join(__dirname, "deserts.json");

const getAll = async () => {
  const data = await fs.readFile(desertsPath);
  return JSON.parse(data);
};

const getById = async (id) => {
  const deserts = await getAll();
  const result = deserts.find((item) => item.id === id);

  return result || null;
};

const add = async (item) => {
  const deserts = await getAll();
  const newDesert = {
    id: nanoid(),
    ...item,
  };
  deserts.push(newDesert);
  await fs.writeFile(desertsPath, JSON.stringify(deserts, null, 2));
  return newDesert;
};

const updateById = async (id, data) => {
  const deserts = await getAll();
  const index = deserts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  deserts[index] = { id, ...data };
  await fs.writeFile(desertsPath, JSON.stringify(deserts, null, 2));
  return deserts[index];
};

const deleteById = async (id) => {
  const deserts = await getAll();
  const index = deserts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = deserts.splice(index, 1);
  await fs.writeFile(desertsPath, JSON.stringify(deserts, null, 2));
  return result;
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
};
