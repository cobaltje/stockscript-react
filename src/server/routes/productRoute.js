const express = require("express");
const router = express.Router();
const productDAO = require("../dao/productDAO");

router.get("/", async (req, res) => {
  try {
    const filters = {
      productname: req.query.productname,
    };

    const data = await productDAO.getProducts(filters);

    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { productname, brand_id, supplier_id } = req.body;

    // Perform the insertion in the database
    const newProduct = await productDAO.createProduct(
      productname,
      brand_id,
      supplier_id
    );

    res.json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);

    if (error.message && error.message.includes("unique constraint")) {
      // Handle uniqueness constraint violation
      res
        .status(400)
        .json({ success: false, message: "product name must be unique" });
    } else {
      // Log the complete error object for further inspection
      console.error("Complete error object:", error);

      // Handle other errors
      const errorMessage = error.detail
        ? error.detail
        : "Internal Server Error";
      res.status(500).json({ success: false, message: errorMessage });
    }
  }
});

router.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const { productname, brand_id, supplier_id } = req.body;

    // Perform the update in the database
    const updatedProduct = await productDAO.updateProduct(
      productId,
      productname,
      brand_id,
      supplier_id
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);

    if (error.message && error.message.includes("unique constraint")) {
      // Handle uniqueness constraint violation
      res
        .status(400)
        .json({ success: false, message: "product name must be unique" });
    } else {
      // Log the complete error object for further inspection
      console.error("Complete error object:", error);

      // Handle other errors
      const errorMessage = error.detail
        ? error.detail
        : "Internal Server Error";
      res.status(500).json({ success: false, message: errorMessage });
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Perform the deletion in the database
    const deletedProduct = await productDAO.deleteProduct(productId);

    if (deletedProduct) {
      res.json({ message: "product deleted successfully" });
    } else {
      res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
