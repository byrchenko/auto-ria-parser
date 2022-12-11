const { slugify } = require("transliteration");
const getFuelTypes = require("../api/fuel");
const getGearboxes = require("../api/gearboxes");
const getBodyStyles = require("../api/body");
const getMarks = require("../api/marks");
const getModels = require("../api/models");
const {
  saveFuel,
  saveGearboxes,
  saveBody,
  saveMarks,
  saveModels,
} = require("./fileSaver");
const CATEGORIES_IDS = require("../constants");

const parseFuelTypes = async () => {
  const fuelTypes = await getFuelTypes();
  await saveFuel(fuelTypes.data);
  console.log("=Fuel saved=");
};

const parseGearboxes = async () => {
  const gearboxes = await getGearboxes(CATEGORIES_IDS.AUTO);
  await saveGearboxes(gearboxes.data);
  console.log("=Gearboxes saved=");
};

const parseBodies = async () => {
  const bodies = await getBodyStyles(CATEGORIES_IDS.AUTO);
  await saveBody(bodies.data);
  console.log("=Bodies saved=");
};

const parseMarks = async () => {
  const marks = await getMarks(CATEGORIES_IDS.AUTO);
  console.log("Marks gotten from auto ria");
  await saveMarks(marks.data);
  console.log("=Marks saved=");
  return marks.data;
};

const parseModels = async (marks) => {
  for (const mark of marks) {
    const models = await getModels(CATEGORIES_IDS.AUTO, mark.value);
    const modelsWithMarkCode = models.data.map((model) => {
      model.markId = mark.value;
      return model;
    });
    await saveModels(modelsWithMarkCode, slugify(mark.name, { trim: true }));
    console.log(`=${mark.name} models saved=`);
  }
};

const parseApiData = async () => {
  console.log(1);
  const marks = await parseMarks();
  // await parseModels(marks);
  // await parseFuelTypes();
  // await parseGearboxes();
  // await parseBodies();
};

module.exports = parseApiData;
