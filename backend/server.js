const express = require("express");
const cors = require("cors");
const path = require("path");
const emergencyRoutes = require("./routes/emergencyRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/emergency", emergencyRoutes);

app.use(express.static(path.join(__dirname, "..")));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});