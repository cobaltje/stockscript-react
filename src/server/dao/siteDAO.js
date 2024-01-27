const db = require("../db");

const getLocations = async (filters) => {
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

module.exports = {
  getLocations,
};
