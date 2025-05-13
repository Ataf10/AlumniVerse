// routes/broadcastRoutes.js
import express from "express";
import BroadcastChannel from "../models/BroadcastChannel.js";
import {
  createChannel,
  createPost,
  postComment,
  joinChannel,
  getPostsByChannel,
  getAllChannels,
  getChannels,
} from "../controllers/broadcastChannelController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Create a broadcast channel
router.post("/channels", upload.single("profilePhoto"), createChannel);

// routes/broadcastRoutes.js (continued)
import BroadcastPost from "../models/BroadcastPost.js";

// Create a post in a channel
router.post("/posts", createPost);

// routes/broadcastRoutes.js (continued)

router.post("/posts/:postId/comments", postComment);

router.get("/posts/channel/:channelId", getPostsByChannel);

// Join a broadcast channel
router.post("/channels/:channelId/join", joinChannel);

router.get("/channels", getAllChannels);

router.get("/channels", getChannels);

export default router;
