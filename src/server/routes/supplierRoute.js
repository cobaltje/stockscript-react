const express = require("express");
const router = express.Router();
const supplierDAO = require("../dao/supplierDAO");

router.get("/", async (req, res) => {
  try {
    const filters = {
      suppliername: req.query.suppliername,
    };

    const data = await supplierDAO.getSuppliers(filters);

    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { suppliername, contact, contact_email, website, image_url } =
      req.body;

    // Perform the insertion in the database
    const newSupplier = await supplierDAO.createSupplier(
      suppliername,
      contact,
      contact_email,
      website,
      image_url
    );

    res.json(newSupplier);
  } catch (error) {
    console.error("Error creating supplier:", error);

    if (error.message && error.message.includes("unique constraint")) {
      // Handle uniqueness constraint violation
      res
        .status(400)
        .json({ success: false, message: "Supplier name must be unique" });
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
    const supplierId = req.params.id;
    const { suppliername, contact, contact_email, website, image_url } =
      req.body;

    // Perform the update in the database
    const updatedSupplier = await supplierDAO.updateSupplier(
      supplierId,
      suppliername,
      contact,
      contact_email,
      website,
      image_url
    );

    res.json(updatedSupplier);
  } catch (error) {
    console.error("Error updating supplier:", error);

    if (error.message && error.message.includes("unique constraint")) {
      // Handle uniqueness constraint violation
      res
        .status(400)
        .json({ success: false, message: "Supplier name must be unique" });
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
    const supplierId = req.params.id;

    // Perform the deletion in the database
    const deletedSupplier = await supplierDAO.deleteSupplier(supplierId);

    if (deletedSupplier) {
      res.json({ message: "Supplier deleted successfully" });
    } else {
      res.status(404).json({ error: "Supplier not found" });
    }
  } catch (error) {
    console.error("Error deleting supplier:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
