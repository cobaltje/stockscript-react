const db = require("../db");

const getSites = async (filters) => {
  let query = `
  SELECT * FROM site WHERE 1 = 1 `;

  Object.keys(filters).forEach((key, index) => {
    if (filters[key]) {
      query += ` AND ${key} = $${index + 1}`;
    }
  });

  query += ` ORDER BY id ASC`;

  return db.any(query, Object.values(filters));
};

const updateSite = async (id, sitename, color_code) => {
  const query = `
    UPDATE site
    SET sitename = $2, color_code = $3
    WHERE id = $1
    RETURNING *`;

  return db.one(query, [id, sitename, color_code]);
};

const createSite = async (sitename, color_code) => {
  const query = `
    INSERT INTO site (sitename, color_code)
    VALUES ($1, $2)
    RETURNING *`;

  return db.one(query, [sitename, color_code]);
};

const deleteSite = async (id) => {
  const query = `
    DELETE FROM site
    WHERE id = $1
    RETURNING *`;

  return db.oneOrNone(query, [id]);
};

module.exports = {
  getSites,
  updateSite,
  createSite,
  deleteSite,
};
