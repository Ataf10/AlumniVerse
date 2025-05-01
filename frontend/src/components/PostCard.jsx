import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Trash2,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Apple as WhatsApp,
  Copy,
  X,
  CheckCheck,
} from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { path, config } from "../path";

const PostCard = ({ post, onDelete, onLikeToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState(null);

  const liked = post.isLiked;

  const userRedux = useSelector((state) => state.user);

  const isUserPost = userRedux._id === post.user._id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${path}/api/users/getUserByID/${post.user._id}`,
          config
        );
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [post.user._id]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/posts/${post._id}`,
        { withCredentials: true }
      );
      onDelete(post._id);
    } catch (error) {
      console.error("Error deleting post:", error.response?.data);
    }
  };

  const handleLike = async () => {
    try {
      if (liked) {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/posts/${post._id}/unlike`,
          {},
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/posts/${post._id}/like`,
          {},
          { withCredentials: true }
        );
      }
      onLikeToggle(post._id, !liked);
    } catch (error) {
      console.error("Error liking/unliking post:", error.response?.data);
    }
  };

  const handleShare = (platform) => {
    const postUrl = `${window.location.origin}/post/${post._id}`;
    const text = `Check out this post on AlumniVerse: ${post.content}`;

    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(
        `${text}\n${postUrl}`
      )}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        postUrl
      )}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        postUrl
      )}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        postUrl
      )}`,
      instagram: `https://instagram.com/`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank");
    }
    setShareModalOpen(false);
  };

  const copyToClipboard = async () => {
    const postUrl = `${window.location.origin}/post/${post._id}`;
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      layout
      className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 hover:shadow-md transition-shadow duration-300"
    >
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={
                user?.user.profilePic
                  ? user.user.profilePic
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt={post.user?.name || "User"}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              <Link to={`/userProfile/${user?.user._id}`}>
                <h3 className="font-semibold text-gray-800 hover:underline">
                  {post.user.name}
                </h3>
              </Link>
            </h3>
            <p className="text-xs text-gray-500">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>

        {/* Three-dot Menu */}
        {isUserPost && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <MoreVertical size={20} className="text-gray-600" />
            </button>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10"
              >
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-red-50 text-red-600 transition-colors duration-200"
                >
                  <Trash2 size={16} />
                  <span>Delete Post</span>
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="p-4">
        <p className="text-gray-800 leading-relaxed">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="relative">
          <img
            src={post.image}
            alt="Post content"
            className="w-full max-h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}

      {/* Interaction Bar */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center gap-6">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 group transition-colors duration-200"
          >
            <div
              className={`p-1.5 rounded-full group-hover:bg-red-50 transition-colors duration-200 ${
                liked ? "bg-red-50" : ""
              }`}
            >
              <Heart
                size={20}
                className={`transition-colors duration-200 ${
                  liked
                    ? "text-red-500 fill-red-500"
                    : "text-gray-600 group-hover:text-red-500"
                }`}
              />
            </div>
            <span
              className={`text-sm ${
                liked
                  ? "text-red-500"
                  : "text-gray-600 group-hover:text-red-500"
              }`}
            >
              {post.likes.length > 0 && post.likes.length}
            </span>
          </button>

          <button className="flex items-center gap-2 group transition-colors duration-200">
            <div className="p-1.5 rounded-full group-hover:bg-blue-50">
              <MessageCircle
                size={20}
                className="text-gray-600 group-hover:text-blue-500"
              />
            </div>
            <span className="text-sm text-gray-600 group-hover:text-blue-500">
              Comment
            </span>
          </button>

          <button
            onClick={() => setShareModalOpen(true)}
            className="flex items-center gap-2 group transition-colors duration-200"
          >
            <div className="p-1.5 rounded-full group-hover:bg-green-50">
              <Share2
                size={20}
                className="text-gray-600 group-hover:text-green-500"
              />
            </div>
            <span className="text-sm text-gray-600 group-hover:text-green-500">
              Share
            </span>
          </button>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {shareModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={() => setShareModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md m-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Share Post
                  </h3>
                  <button
                    onClick={() => setShareModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Share Options */}
              <div className="p-6 grid grid-cols-3 gap-4">
                <ShareButton
                  icon={<WhatsApp size={24} />}
                  label="WhatsApp"
                  onClick={() => handleShare("whatsapp")}
                  color="bg-green-500"
                />
                <ShareButton
                  icon={<Instagram size={24} />}
                  label="Instagram"
                  onClick={() => handleShare("instagram")}
                  color="bg-pink-500"
                />
                <ShareButton
                  icon={<Facebook size={24} />}
                  label="Facebook"
                  onClick={() => handleShare("facebook")}
                  color="bg-blue-600"
                />
                <ShareButton
                  icon={<Twitter size={24} />}
                  label="Twitter"
                  onClick={() => handleShare("twitter")}
                  color="bg-blue-400"
                />
                <ShareButton
                  icon={<Linkedin size={24} />}
                  label="LinkedIn"
                  onClick={() => handleShare("linkedin")}
                  color="bg-blue-700"
                />
                <ShareButton
                  icon={copied ? <CheckCheck size={24} /> : <Copy size={24} />}
                  label="Copy Link"
                  onClick={copyToClipboard}
                  color={copied ? "bg-green-500" : "bg-gray-600"}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ShareButton = ({ icon, label, onClick, color }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="flex flex-col items-center gap-2"
  >
    <div className={`p-3 rounded-full ${color} text-white shadow-lg`}>
      {icon}
    </div>
    <span className="text-sm text-gray-600">{label}</span>
  </motion.button>
);

export default PostCard;
