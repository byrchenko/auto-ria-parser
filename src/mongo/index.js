const { MongoClient } = require("mongodb");

const url = "mongodb://root:root@localhost:27017";

const client = new MongoClient(url);

const dbName = "vexsa";

async function initDb() {
  await client.connect();

  console.log("Connected successfully to server");

  return client.db(dbName);
}

module.exports = initDb;
