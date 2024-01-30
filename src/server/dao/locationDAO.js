const db = require("../db");

const getLocations = async (filters) => {
  let query = `
  SELECT location.*, site.id as site_id, site.sitename, site.color_code as site_color_code FROM location 
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

const updateLocation = async (id, locationname, site_id, color_code) => {
  const query = `
    UPDATE location
    SET locationname = $2, site_id = $3, color_code = $4
    WHERE id = $1
    RETURNING *`;

  return db.one(query, [id, locationname, site_id, color_code]);
};

const createLocation = async (locationname, site_id, color_code) => {
  const query = `
    INSERT INTO location (locationname, site_id, color_code)
    VALUES ($1, $2, $3)
    RETURNING *`;

  return db.one(query, [locationname, site_id, color_code]);
};

const deleteLocation = async (id) => {
  const query = `
    DELETE FROM location
    WHERE id = $1
    RETURNING *`;

  return db.oneOrNone(query, [id]);
};

module.exports = {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
};
