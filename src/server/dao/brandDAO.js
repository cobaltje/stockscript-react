const db = require("../db");

const getBrands = async (filters) => {
  let query = `
  SELECT * FROM brand WHERE 1 = 1 `;

  Object.keys(filters).forEach((key, index) => {
    if (filters[key]) {
      query += ` AND ${key} = $${index + 1}`;
    }
  });

  query += ` ORDER BY brand.id ASC`;

  return db.any(query, Object.values(filters));
};

const updateBrand = async (id, brandname) => {
  const query = `
    UPDATE brand
    SET brandname = $2
    WHERE id = $1
    RETURNING *`;

  return db.one(query, [id, brandname]);
};

const createBrand = async (brandname) => {
  const query = `
    INSERT INTO brand (brandname)
    VALUES ($1)
    RETURNING *`;

  return db.one(query, [brandname]);
};

const deleteBrand = async (id) => {
  const query = `
    DELETE FROM brand
    WHERE id = $1
    RETURNING *`;

  return db.oneOrNone(query, [id]);
};

module.exports = {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
};
