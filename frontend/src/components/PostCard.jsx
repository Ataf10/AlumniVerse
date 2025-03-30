import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Trash2,
} from "lucide-react";
import axios from "axios";

const PostCard = ({ post, onDelete, onLikeToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const liked = post.isLiked; // Whether the user has liked the post

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/posts/${post._id}`,
        { withCredentials: true }
      );
      onDelete(post._id); // Remove post from UI after deletion
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

  return (
    <div className="relative p-4 border rounded-md mb-2">
      {/* Post Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={
              post.user?.profilePic ||
              "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg"
            }
            alt={post.user?.name || "User"}
            className="w-10 h-10 rounded-full"
          />
          <p className="font-bold">{post?.user?.name || "Anonymous"}</p>
        </div>

        {/* Three-dot Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <MoreVertical size={24} className="text-gray-600" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-md z-10">
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-red-100 text-red-600"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <p className="mt-2">{post.content}</p>

      {/* Display Image (if exists) */}
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="mt-2 rounded-md max-w-full"
        />
      )}

      <p className="text-gray-500 text-sm">
        {new Date(post.createdAt).toLocaleString()}
      </p>

      {/* Like, Comment, Share Buttons */}
      <div className="flex gap-4 mt-2 items-center">
        <button
          onClick={handleLike}
          className="flex items-center cursor-pointer"
        >
          <Heart
            size={24}
            className={liked ? "text-red-500 fill-red-500" : "text-gray-500"}
          />
          <span className="ml-1">{post.likes.length}</span>
        </button>
        <button className="flex items-center cursor-pointer">
          <MessageCircle size={24} className="text-gray-500" />
        </button>
        <button className="flex items-center cursor-pointer">
          <Share2 size={24} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
