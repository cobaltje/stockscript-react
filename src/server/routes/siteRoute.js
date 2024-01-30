const express = require("express");
const router = express.Router();
const siteDAO = require("../dao/siteDAO");

router.get("/", async (req, res) => {
  try {
    const filters = {
      sitename: req.query.sitename,
    };

    const data = await siteDAO.getSites(filters);

    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { sitename, color_code } = req.body;

    // Perform the insertion in the database
    const newSite = await siteDAO.createSite(sitename, color_code);

    res.json(newSite);
  } catch (error) {
    console.error("Error creating site:", error);

    if (error.message && error.message.includes("unique constraint")) {
      // Handle uniqueness constraint violation
      res
        .status(400)
        .json({ success: false, message: "Site name must be unique" });
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
    const siteId = req.params.id;
    const { sitename, color_code } = req.body;

    // Perform the update in the database
    const updatedSite = await siteDAO.updateSite(siteId, sitename, color_code);

    res.json(updatedSite);
  } catch (error) {
    console.error("Error updating site:", error);

    if (error.message && error.message.includes("unique constraint")) {
      // Handle uniqueness constraint violation
      res
        .status(400)
        .json({ success: false, message: "Site name must be unique" });
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
    const siteId = req.params.id;

    // Perform the deletion in the database
    const deletedSite = await siteDAO.deleteSite(siteId);

    if (deletedSite) {
      res.json({ message: "Site deleted successfully" });
    } else {
      res.status(404).json({ error: "Site not found" });
    }
  } catch (error) {
    console.error("Error deleting site:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
