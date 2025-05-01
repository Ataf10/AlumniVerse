import { path } from "../../path.js";
import { io } from "socket.io-client";

class SocketService {
  constructor(url) {
    this.socket = io(url, { transports: ["websocket"] });
  }

  connect(roomId, userId) {
    this.socket.emit("joinRoom", {
      roomId,
      userId,
      socketId: this.socket.id,
    });
  }

  onMessage(callback) {
    this.socket.on("roomMsg", callback);
  }

  sendMessage({ roomId, message, senderId }) {
    this.socket.emit("sendMessage", { roomId, message, senderId });
  }

  disconnect() {
    this.socket.off("disconnect");
    this.socket.off("connect");
    this.socket.off("roomMsg");
  }

  onDisconnect(callback) {
    this.socket.on("disconnect", callback);
  }
}

const socketService = new SocketService(path);
export default socketService;
