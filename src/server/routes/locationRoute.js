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

module.exports = router;
