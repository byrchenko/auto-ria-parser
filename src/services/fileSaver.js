const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const initDb = require("../mongo");
const { slugify } = require("transliteration");
const getModels = require("../api/models");
const CATEGORIES_IDS = require("../constants");

const saveFile = async (content, filename, folder) => {
  const fileDir = path.join(__dirname, `../../dist/${folder}`);
  await mkdirp(fileDir);
  fs.writeFileSync(fileDir + `/${filename}.json`, content);
};

const saveMarks = async (data) => {
  // const content = JSON.stringify(data, null, 2);

  const db = await initDb();
  const carBrands = db.collection("brands");

  const result = [];

  for (let brand of data) {
    const { data: models } = await getModels(CATEGORIES_IDS.AUTO, brand.value);

    result.push({
      name: brand.name,
      code: slugify(brand.name, { trim: true }),
      models: models.map((model) => ({
        name: model.name,
        code: slugify(model.name, { trim: true }),
      })),
    });

    console.log("Created brand " + brand.name);
  }

  const brands = await carBrands.insertMany(result, { ordered: true });

  // return saveFile(content, "marks", "marks");
};

const saveFuel = (data) => {
  const content = JSON.stringify(data, null, 2);
  return saveFile(content, "fuel", "fuel");
};

const saveBody = (data) => {
  const content = JSON.stringify(data, null, 2);
  return saveFile(content, "body", "body");
};

const saveGearboxes = (data) => {
  const content = JSON.stringify(data, null, 2);
  return saveFile(content, "gearboxes", "gearboxes");
};

const saveModels = (data, modelMark) => {
  const content = JSON.stringify(data, null, 2);
  return saveFile(content, modelMark, "models");
};

module.exports = {
  saveMarks,
  saveModels,
  saveGearboxes,
  saveFuel,
  saveBody,
};
