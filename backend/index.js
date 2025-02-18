import db from "./db.js";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT;
const client = process.env.CLIENT;

app.use("/auth", authRoutes);
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}\nClient: ${client}`)
);
