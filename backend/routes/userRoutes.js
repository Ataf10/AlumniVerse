import express from "express";
import { getUserById } from "../controllers/userController.js";

const router = express.Router();

// ✅ Route to Get User by ID
router.get("/:id", getUserById);

export default router;
