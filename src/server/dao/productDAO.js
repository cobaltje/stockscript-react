const db = require("../db");

const getProducts = async (filters) => {
  let query = `
  SELECT product.*, brand.brandname, supplier.suppliername  FROM product 
  LEFT JOIN brand on brand.id = product.brand_id
  LEFT JOIN supplier on supplier.id = product.supplier_id
  WHERE 1 = 1 `;

  Object.keys(filters).forEach((key, index) => {
    if (filters[key]) {
      query += ` AND ${key} = $${index + 1}`;
    }
  });

  query += ` ORDER BY id ASC`;

  return db.any(query, Object.values(filters));
};

const updateProduct = async (
  id,
  productname,
  brand_id,
  supplier_id,
  image_url
) => {
  const query = `
    UPDATE site
    SET productname = $2, brand_id = $3, supplier_id = $4, image_url = $5
    WHERE id = $1
    RETURNING *`;

  return db.one(query, [id, productname, brand_id, supplier_id, image_url]);
};

const createProduct = async (productname, brand_id, supplier_id, image_url) => {
  const query = `
    INSERT INTO product (productname, brand_id, supplier_id, image_url)
    VALUES ($1, $2)
    RETURNING *`;

  return db.one(query, [productname, brand_id, supplier_id, image_url]);
};

const deleteProduct = async (id) => {
  const query = `
    DELETE FROM product
    WHERE id = $1
    RETURNING *`;

  return db.oneOrNone(query, [id]);
};

module.exports = {
  getProducts,
  updateProduct,
  createProduct,
  deleteProduct,
};
