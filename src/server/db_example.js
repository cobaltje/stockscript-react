// Rename this file to db.js to be able to use it.

const login = "";
const password = "";
const adress = "";
const port = 5432;
const database = "";

const pgp = require("pg-promise")();
const db = pgp(`postgres://${login}:${password}@${adress}:${port}/${database}`);

module.exports = db;
