const db = require("../db");

const getSuppliers = async (filters) => {
  let query = `
    SELECT * FROM supplier WHERE 1 = 1 `;

  Object.keys(filters).forEach((key, index) => {
    if (filters[key]) {
      query += ` AND ${key} = $${index + 1}`;
    }
  });

  query += ` ORDER BY id ASC`;

  return db.any(query, Object.values(filters));
};

const updateSupplier = async (
  id,
  suppliername,
  contact,
  contact_email,
  website,
  image_url
) => {
  const query = `
    UPDATE supplier
    SET suppliername = $2, contact = $3, contact_email = $4, website = $5, image_url = $6 
    WHERE id = $1
    RETURNING *`;

  return db.one(query, [
    id,
    suppliername,
    contact,
    contact_email,
    website,
    image_url,
  ]);
};

const createSupplier = async (
  suppliername,
  contact,
  contact_email,
  website,
  image_url
) => {
  const query = `
    INSERT INTO supplier (suppliername,
      contact,
      contact_email,
      website,
      image_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;

  return db.one(query, [
    suppliername,
    contact,
    contact_email,
    website,
    image_url,
  ]);
};

const deleteSupplier = async (id) => {
  const query = `
    DELETE FROM supplier
    WHERE id = $1
    RETURNING *`;

  return db.oneOrNone(query, [id]);
};

module.exports = {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
