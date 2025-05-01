import UserChat from "../models/UserChat.js";

export const createUserChat = async (req, res) => {
  try {
    const { participants, isGroupChat = false, chatName } = req.body;

    if (!participants || participants.length < 2) {
      return res
        .status(400)
        .json({ message: "At least two participants are required" });
    }

    // Optional: Check if chat already exists
    const existingChat = await UserChat.findOne({
      participants: { $all: participants, $size: participants.length },
      isGroupChat,
    });

    if (existingChat) {
      return res
        .status(200)
        .json({ chat: existingChat, message: "Chat already exists" });
    }

    const newChat = await UserChat.create({
      participants,
      isGroupChat,
      chatName,
    });

    res.status(201).json({ chat: newChat });
  } catch (error) {
    console.error("Create chat error:", error);
    res.status(500).json({ message: "Server error while creating chat" });
  }
};

export const getUserChats = async (req, res) => {
  try {
    const userId = req.params.userId;

    const chats = await UserChat.find({ participants: userId })
      .populate("participants", "name email profilePic") // Optional: populating user info
      .populate("lastMessage")
      .populate("messages") // Optional: if you store lastMessage reference
      .sort({ updatedAt: -1 }); // Optional: sort by most recent

    res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching user chats:", error);
    res.status(500).json({ message: "Failed to fetch chats", error });
  }
};
