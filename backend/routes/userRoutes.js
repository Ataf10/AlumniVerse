import express from "express";
import { protect } from "../middleware/authMiddleWare.js";
import {
  getUserById,
  updateUserProfile,
  removeProfilePicture,
  uploadProfilePicture,
} from "../controllers/userController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Route to Get User by ID
router.get("/:id", getUserById);
router.put("/:id", updateUserProfile);

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

export default router;
