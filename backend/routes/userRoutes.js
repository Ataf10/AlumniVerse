import express from "express";
import { protect } from "../middleware/authMiddleWare.js";
import {
  getUserById,
  updateUserProfile,
  removeProfilePicture,
  uploadProfilePicture,
  searchUser,
} from "../controllers/userController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Route to Get User by ID
router.get("/getUserByID/:id", getUserById);
router.put("/getUserByID/:id", updateUserProfile);

router.put(
  "/upload-profile-pic/:id",
  upload.single("profilePic"),
  uploadProfilePicture
);
router.put("/remove-profile-pic/:id", protect, removeProfilePicture);
router.put(
  "/upload-profile-pic/:id",
  protect,
  upload.single("profilePic"),
  uploadProfilePicture
);

// Add this at the bottom of userRoutes.js
router.get("/search", searchUser);

export default router;
