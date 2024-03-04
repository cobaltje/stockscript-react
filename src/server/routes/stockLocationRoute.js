const express = require("express");
const router = express.Router();
const stockLocationDAO = require("../dao/stockLocationDAO");

router.get("/", async (req, res) => {
  try {
    const filters = {
      product_id: req.query.product_id,
    };

    const data = await stockLocationDAO.getStockLocations(filters);

    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { location_id, product_id, stock, minimum_stock, maximum_stock } =
      req.body;

    // Perform the insertion in the database
    const newStockLocation = await stockLocationDAO.createSite(
      location_id,
      product_id,
      stock,
      minimum_stock,
      maximum_stock
    );

    res.json(newStockLocation);
  } catch (error) {
    console.error("Error creating stocklocation:", error);

    if (error.message && error.message.includes("unique constraint")) {
      // Handle uniqueness constraint violation
      res
        .status(400)
        .json({ success: false, message: "StockLocation name must be unique" });
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
    const stockLocationId = req.params.id;
    const { location_id, product_id, stock, minimum_stock, maximum_stock } =
      req.body;

    // Perform the update in the database
    const updatedStockLocation = await stockLocationDAO.updateSite(
      stockLocationId,
      location_id,
      product_id,
      stock,
      minimum_stock,
      maximum_stock
    );

    res.json(updatedStockLocation);
  } catch (error) {
    console.error("Error updating stocklocation:", error);

    if (error.message && error.message.includes("unique constraint")) {
      // Handle uniqueness constraint violation
      res
        .status(400)
        .json({ success: false, message: "Stocklocation name must be unique" });
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
    const stockLocationId = req.params.id;

    // Perform the deletion in the database
    const deletedStockLocation = await stockLocationDAO.deleteSite(
      stockLocationId
    );

    if (deletedStockLocation) {
      res.json({ message: "StockLocation deleted successfully" });
    } else {
      res.status(404).json({ error: "StockLocation not found" });
    }
  } catch (error) {
    console.error("Error deleting StockLocation:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
