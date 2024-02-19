const express = require("express");
// const router = express.Router();
// const bodyParser = require("body-parser");
const app = express();
const PORT = 3002;
const cors = require("cors");

const locationRoutes = require("./routes/locationRoute");
const siteRoutes = require("./routes/siteRoute");
const supplierRoutes = require("./routes/supplierRoute");
const brandRoutes = require("./routes/brandRoute");

app.use(cors());
app.use(express.json());
app.use("/location", locationRoutes);
app.use("/site", siteRoutes);
app.use("/supplier", supplierRoutes);
app.use("/brand", brandRoutes);

app.get("/", (req, res) => {
  res.send("Hello, this is your server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
