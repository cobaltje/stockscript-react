const express = require("express");
// const router = express.Router();
// const bodyParser = require("body-parser");
const app = express();
const PORT = 3002;
const cors = require("cors");

const locationRoutes = require("./routes/locationRoute");

app.use(cors());
app.use("/location", locationRoutes);

app.get("/", (req, res) => {
  res.send("Hello, this is your server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
