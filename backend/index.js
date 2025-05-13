// index.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./config/passportConfig.js";
import authRoutes from "./routes/authRoutes.js";
import db from "./db.js";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userChatRoutes from "./routes/userChatRoutes.js";
import broadcastRoutes from "./routes/broadcastRoutes.js";
import broadcastPostRoutes from "./routes/broadcastPostRoutes.js";
import { createServer } from "http"; // ✅ Create raw HTTP server
import { Server } from "socket.io"; // ✅ Import socket.io
import { sendRoomMessage } from "./controllers/messageController.js";

dotenv.config();

// Initialize Express app
const app = express();

// ✅ Create HTTP server from Express app
const httpServer = createServer(app);

// ✅ Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// ✅ Session middleware
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});
app.use(sessionMiddleware);

// ✅ Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/userchats", userChatRoutes);
app.use("/api/broadcast", broadcastRoutes);
app.use("/api/broadcastPost", broadcastPostRoutes);

// ✅ Setup Socket.io server
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

let userSockets = {}; // To store user socket ids

// ✅ Socket.io Events
io.on("connection", (socket) => {
  console.log(`✅ New socket connected: ${socket.id}`);

  // Join a room
  socket.on("joinRoom", ({ roomId, userId }) => {
    socket.join(roomId);
    userSockets[userId] = socket.id;
    console.log(`${userId} joined room ${roomId}`);
  });

  // Listen for new message events
  socket.on("sendMessage", async ({ roomId, message, senderId }) => {
    // Emit the message to the room
    try {
      const newMessage = await sendRoomMessage({
        roomId,
        message,
        senderId,
      });
      if (newMessage) {
        console.log({ roomId, message, senderId });
        io.to(roomId).emit("roomMsg", newMessage);
      } else {
        console.log("failed to create message, problem in message db");
      }
    } catch (error) {
      console.log("catch from sockect");
    }
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log(`❌ Socket disconnected: ${socket.id}`);
  });
});

// ✅ Start server
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
