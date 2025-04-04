import express from "express";
import {
  getUserById,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

// ✅ Route to Get User by ID
router.get("/:id", getUserById);
router.put("/:id", updateUserProfile);
export default router;
