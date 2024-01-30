const db = require("../db");

const getLocations = async (filters) => {
  let query = `
  SELECT location.*, site.id as site_id, site.sitename, site.color_code FROM location 
  LEFT JOIN site ON site.id = location.site_id
  WHERE 1 = 1 `;

  Object.keys(filters).forEach((key, index) => {
    if (filters[key]) {
      query += ` AND ${key} = $${index + 1}`;
    }
  });

  query += ` ORDER BY location.id ASC`;

  return db.any(query, Object.values(filters));
};

module.exports = {
  getLocations,
};
