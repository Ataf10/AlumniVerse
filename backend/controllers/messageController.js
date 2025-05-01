import Message from "../models/Message.js";
import UserChat from "../models/UserChat.js";

export const sendRoomMessage = async ({
  message: messageVal,
  roomId,
  senderId,
}) => {
  try {
    // Find the user in the database

    const messagesCreate = await Message.create({
      chatId: roomId,
      message: messageVal,
      senderId: senderId,
    });

    if (messagesCreate) {
      const createRoomMsg = await UserChat.updateOne(
        { _id: roomId },
        { $push: { messages: messagesCreate._id } }
      );

      if (createRoomMsg.modifiedCount > 0) {
        console.log("Message sent successfully");
        return messagesCreate;
      } else {
        console.log("Failed to update the classroom with the new message");
      }
    }
  } catch (error) {
    console.error("Error sending room message:", error);
  }
  return null;
};
