import express from "express";
import {
  createUserChat,
  getUserChats,
} from "../controllers/userChatController.js";

const router = express.Router();

router.post("/create", createUserChat);
router.get("/chatGetter/:userId", getUserChats);

export default router;
