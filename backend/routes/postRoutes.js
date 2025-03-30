import express from "express";
import {
  createPost,
  getAllPosts,
  deletePost,
  likePost,
  unlikePost,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleWare.js";
import upload from "../middleware/multer.js"; // Import multer

const router = express.Router();

// ✅ Create a Post (Protected) with Image Upload
router.post("/", protect, upload.single("image"), createPost);

// ✅ Get All Posts
router.get("/", getAllPosts);

// ✅ Like a Post
router.post("/:id/like", protect, likePost);

// ✅ Unlike a Post
router.post("/:id/unlike", protect, unlikePost);

// ✅ Delete a Post (Protected)
router.delete("/:id", protect, deletePost);

export default router;
