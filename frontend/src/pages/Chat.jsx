import { useState } from "react";
import UserChat from "../components/UserChat";
import Chats from "../components/Chats";
import { motion } from "framer-motion";

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [lastMessage, setLastMessage] = useState("");

  return (
    <motion.div
      className="flex flex-col md:flex-row h-screen bg-gradient-to-tr from-blue-100 via-white to-purple-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Sidebar - User Chat List */}
      <motion.div
        className="md:w-1/3 w-full border-r border-gray-200 bg-white shadow-lg overflow-y-auto custom-scrollbar"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <UserChat setActiveChat={setActiveChat} lastMessage={lastMessage} />
      </motion.div>

      {/* Main Chat Area */}
      <motion.div
        className="md:w-2/3 w-full h-full bg-white shadow-xl overflow-y-auto custom-scrollbar rounded-t-2xl md:rounded-none"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Chats activeChat={activeChat} setLastMessage={setLastMessage} />
      </motion.div>
    </motion.div>
  );
};

export default Chat;
