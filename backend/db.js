const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://alialiataf1234:kej7W9VgitsBLDtT@alumniverse.hrlfc.mongodb.net/?retryWrites=true&w=majority&appName=AlumniVerse"; // Change to your DB name

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Event listeners for connection status
db.on("connected", () => console.log("✅ MongoDB connected successfully"));
db.on("error", (err) => console.error("❌ MongoDB connection error:", err));
db.on("disconnected", () => console.log("⚠️ MongoDB disconnected"));

module.exports = db;
