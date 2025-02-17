require("./db"); // Import database connection

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("MongoDB Atlas is connected!");
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));