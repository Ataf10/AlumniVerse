import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import socketService from "../lib/SocketServices/socketServices.js";
import { motion, AnimatePresence } from "framer-motion";

const Chats = ({ activeChat, setLastMessage }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const messagesContainerRef = useRef(null);

  const loggedUser = useSelector((state) => state.user);
  const chatPartner = activeChat?.participants?.find(
    (p) => p._id !== loggedUser._id
  );

  // Load messages when chat changes
  useEffect(() => {
    setMessages(activeChat?.messages || []);
  }, [activeChat]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Setup socket
  useEffect(() => {
    if (!activeChat?._id) return;

    socketService.connect(activeChat._id, loggedUser._id);

    socketService.onMessage((message) => {
      setMessages((prev) => [...prev, message]);
      setLastMessage(message.message);
    });

    return () => {
      socketService.disconnect();
    };
  }, [activeChat?._id, loggedUser._id]);

  // Send new message
  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    socketService.sendMessage({
      roomId: activeChat._id,
      message: newMessage.trim(),
      senderId: loggedUser._id,
    });
    setLastMessage(newMessage.trim());
    setNewMessage("");
  };

  if (!activeChat) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-100 to-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b bg-white shadow-md">
        <img
          src={chatPartner?.profilePic}
          alt={chatPartner?.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <h2 className="text-lg font-semibold text-gray-800">
          {chatPartner?.name}
        </h2>
      </div>

      {/* Message list */}
      <div
        ref={messagesContainerRef}
        className="flex-1 px-4 py-3 overflow-y-auto custom-scrollbar"
      >
        {loading ? (
          <div className="text-center text-gray-500">Loading messages...</div>
        ) : messages?.length === 0 ? (
          <div className="text-center text-gray-500">No messages yet</div>
        ) : (
          <div className="flex flex-col gap-3">
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => {
                const isOwn = msg.senderId === loggedUser._id;
                const time = new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <motion.div
                    key={msg._id || `${msg.senderId}-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${
                      isOwn ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className={`max-w-xs relative`}>
                      <div
                        className={`inline-block px-4 py-2 rounded-2xl shadow-sm text-sm ${
                          isOwn
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-gray-200 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        {msg.message}
                      </div>
                      <div
                        className={`text-[11px] text-gray-400 mt-1 ${
                          isOwn ? "text-right pr-1" : "text-left pl-1"
                        }`}
                      >
                        {time}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Message input */}
      <form
        onSubmit={sendMessage}
        className="p-4 bg-white border-t flex items-center gap-3"
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 bg-gray-100 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition duration-200"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chats;
