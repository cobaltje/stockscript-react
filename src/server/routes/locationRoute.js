const express = require("express");
const router = express.Router();
const locationDAO = require("../dao/locationDAO");

router.get("/", async (req, res) => {
  try {
    const filters = {
      locationname: req.query.locationname,
    };

    const data = await locationDAO.getLocations(filters);

    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { locationname, site_id, color_code } = req.body;

    // Perform the insertion in the database
    const newLocation = await locationDAO.createLocation(
      locationname,
      site_id,
      color_code
    );

    res.json(newLocation);
  } catch (error) {
    console.error("Error creating location:", error);

    if (error.message && error.message.includes("unique constraint")) {
      // Handle uniqueness constraint violation
      res
        .status(400)
        .json({ success: false, message: "Location name must be unique" });
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
    const locationId = req.params.id;
    const { locationname, site_id, color_code } = req.body;

    // Perform the update in the database
    const updatedLocation = await locationDAO.updateLocation(
      locationId,
      locationname,
      site_id,
      color_code
    );

    res.json(updatedLocation);
  } catch (error) {
    console.error("Error updating Location:", error);

    if (error.message && error.message.includes("unique constraint")) {
      // Handle uniqueness constraint violation
      res
        .status(400)
        .json({ success: false, message: "Location name must be unique" });
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
    const locationId = req.params.id;

    // Perform the deletion in the database
    const deletedLocation = await locationDAO.deleteLocation(locationId);

    if (deletedLocation) {
      res.json({ message: "Location deleted successfully" });
    } else {
      res.status(404).json({ error: "Location not found" });
    }
  } catch (error) {
    console.error("Error deleting location:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
