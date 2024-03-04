const db = require("../db");

const getStockLocations = async (filters) => {
  let query = `
    SELECT * FROM stocklocation
    LEFT JOIN location on location.id = stocklocation.location_id
    LEFT JOIN product on product.id = stocklocation.product_id
    WHERE 1 = 1 `;

  Object.keys(filters).forEach((key, index) => {
    if (filters[key]) {
      query += ` AND ${key} = $${index + 1}`;
    }
  });

  query += ` ORDER BY id ASC `;

  return db.any(query, Object.values(filters));
};

const updateStockLocation = async (
  id,
  location_id,
  product_id,
  stock,
  minimum_stock,
  maximum_stock
) => {
  const query = `
        UPDATE stocklocation
        SET location_id = $2, product_id = $3, stock = $4, minimum_stock = $5, maximum_stock = $6
        WHERE id = $1
        RETURNING *`;

  return db.one(query, [
    id,
    location_id,
    product_id,
    stock,
    minimum_stock,
    maximum_stock,
  ]);
};

const createStockLocation = async (
  location_id,
  product_id,
  stock,
  minimum_stock,
  maximum_stock
) => {
  const query = `
        INSERT INTO stocklocation (location_id, product_id, stock, minimum_stock, maximum_stock)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`;

  return db.one(query, [
    location_id,
    product_id,
    stock,
    minimum_stock,
    maximum_stock,
  ]);
};

const deleteStockLocation = async (id) => {
  const query = `
    DELETE FROM stocklocation 
    WHERE id = $1
    RETURNING *`;

  return db.oneOrNone(query, [id]);
};

module.exports = {
  getStockLocations,
  updateStockLocation,
  createStockLocation,
  deleteStockLocation,
};
