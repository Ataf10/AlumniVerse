import express from "express";
import {
  getPostsByChannel,
  deletePost,
  createPost,
  addComment,
  deleteComment,
  loadComments,
} from "../controllers/broadcastPostController.js";

const router = express.Router();

router.post("/posts", createPost);
router.get("/channel/:channelId", getPostsByChannel);
router.delete("/:postId", deletePost);

// Comment routes
router.get("/posts/:postId/comments", loadComments);
router.post("/posts/:postId/comments", addComment);
router.delete("/posts/:postId/comments/:commentId", deleteComment);

export default router;
