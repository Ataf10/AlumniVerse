import mongoose from "mongoose";
import dotenv from "dotenv"; // Load environment variables
dotenv.config();

const mongoURI = process.env.MONGOURI; // Change to your DB name

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Event listeners for connection status
db.on("connected", () => console.log("✅ MongoDB connected successfully"));
db.on("error", (err) => console.error("❌ MongoDB connection error:", err));
db.on("disconnected", () => console.log("⚠️ MongoDB disconnected"));

export default db;
