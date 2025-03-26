import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./config/passportConfig.js"; // ✅ Import Passport config
import authRoutes from "./routes/authRoutes.js";
import db from "./db.js"; // ✅ Import database connection
import cookieParser from "cookie-parser";

dotenv.config(); // Load environment variables

const app = express();

// ✅ Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// ✅ Session Middleware (Required for Passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// ✅ Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes

app.use("/auth", authRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
