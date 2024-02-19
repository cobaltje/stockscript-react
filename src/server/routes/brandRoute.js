const express = require("express");
const router = express.Router();
const brandDAO = require("../dao/brandDAO");

router.get("/", async (req, res) => {
  try {
    const filters = {
      brandname: req.query.brandname,
    };

    const data = await brandDAO.getBrands(filters);

    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { brandname } = req.body;

    // Perform the insertion in the database
    const newBrand = await brandDAO.createBrand(brandname);

    res.json(newBrand);
  } catch (error) {
    console.error("Error creating supplier:", error);

    if (error.message && error.message.includes("unique constraint")) {
      // Handle uniqueness constraint violation
      res
        .status(400)
        .json({ success: false, message: "Brand name must be unique" });
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
    const brandId = req.params.id;
    const { brandname } = req.body;

    // Perform the update in the database
    const updatedBrand = await brandDAO.updateBrand(brandId, brandname);

    res.json(updatedBrand);
  } catch (error) {
    console.error("Error updating brand:", error);

    if (error.message && error.message.includes("unique constraint")) {
      // Handle uniqueness constraint violation
      res
        .status(400)
        .json({ success: false, message: "Brand name must be unique" });
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
    const brandId = req.params.id;

    // Perform the deletion in the database
    const deletedBrand = await brandDAO.deleteBrand(brandId);

    if (deletedBrand) {
      res.json({ message: "Brand deleted successfully" });
    } else {
      res.status(404).json({ error: "Brand not found" });
    }
  } catch (error) {
    console.error("Error deleting Brand:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
