const express = require("express");
const router = express.Router();
const siteDAO = require("../dao/siteDAO");

router.get("/", async (req, res) => {
  try {
    const filters = {
      sitename: req.query.sitename,
    };

    const data = await siteDAO.getLocations(filters);

    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
