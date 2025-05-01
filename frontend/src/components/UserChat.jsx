import { useState, useEffect } from "react";
import axios from "axios";
import { path, config } from "../path.js";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const socket = socketIOClient(import.meta.env.VITE_CLIENT_URL, {
  withCredentials: true,
});

const UserChat = ({ setActiveChat, lastMessage }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [chats, setChats] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingChats, setLoadingChats] = useState(false);
  const [fetcher, setFetcher] = useState(false);

  const loggedUser = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        const response = await axios.get(
          `${path}/api/userchats/chatGetter/${loggedUser._id}`
        );
        setChats(response.data);
      } catch (err) {
        console.error("Error fetching user chats:", err);
      }
    };
    fetchUserChats();
  }, [fetcher]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoadingSearch(true);
      const { data } = await axios.get(
        `${path}/api/users/search?query=${value}`,
        config
      );
      setSearchResults(data);
    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      setLoadingSearch(false);
    }
  };

  const createChat = async (user1, user2) => {
    try {
      setLoadingSearch(true);
      const response = await axios.post(`${path}/api/userchats/create`, {
        participants: [user1, user2],
      });
      setFetcher(!fetcher);
      return response.data.chat;
    } catch (error) {
      console.error("Error creating chat:", error);
    } finally {
      setLoadingSearch(false);
    }
  };

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto mt-6 border border-gray-200">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search users..."
        className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Search Results */}
      <AnimatePresence>
        {searchQuery && (
          <motion.div
            className="mt-3 bg-gray-50 rounded-xl shadow-inner max-h-60 overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {loadingSearch ? (
              <div className="p-4 text-center text-gray-500">Searching...</div>
            ) : searchResults.length > 0 ? (
              searchResults.map((user) => (
                <motion.div
                  key={user._id}
                  className="flex items-center justify-between p-2 hover:bg-blue-50 transition cursor-pointer"
                  onClick={() => {
                    createChat(user._id, loggedUser._id);
                    setSearchQuery("");
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        user.profilePic ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <p className="font-medium text-sm">{user.name}</p>
                  </div>
                  <span className="text-blue-500 text-xs font-medium">
                    Start Chat
                  </span>
                </motion.div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No users found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* My Chats */}
      <h2 className="mt-6 mb-3 text-lg font-bold text-gray-700">My Chats</h2>
      <div className="flex flex-col gap-3">
        {loadingChats ? (
          <div className="text-center text-gray-500">Loading chats...</div>
        ) : chats.length > 0 ? (
          chats.map((chat) => {
            const chatPartner =
              chat.participants[0]._id === loggedUser._id
                ? chat.participants[1]
                : chat.participants[0];

            return (
              <motion.div
                key={chat._id}
                className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-100 cursor-pointer transition"
                onClick={() => setActiveChat(chat)}
                whileHover={{ scale: 1.01 }}
              >
                <img
                  src={
                    chatPartner.profilePic ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt={chatPartner.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-800 text-sm">
                    {chatPartner.name}
                  </p>
                  {chat.lastMessage && (
                    <div className="flex justify-between items-center text-xs text-gray-500 w-full max-w-[180px]">
                      <p className="truncate max-w-[140px]">
                        {chat.lastMessage}
                      </p>
                      <span className="whitespace-nowrap ml-2 text-[10px] text-gray-400">
                        {new Date(chat.updatedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center text-gray-500">No chats yet</div>
        )}
      </div>
    </div>
  );
};

export default UserChat;
