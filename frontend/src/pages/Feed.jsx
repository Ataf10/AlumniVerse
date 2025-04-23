import { useState, useEffect, useRef } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, X, Send, Loader2 } from "lucide-react";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const user = useSelector((state) => state.user);

  const userId = user._id;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/posts`,
        { withCredentials: true }
      );
      const postsWithLikeStatus = response.data.posts.map((post) => ({
        ...post,
        isLiked: post.likes.some((like) => like.user === userId),
      }));
      setPosts(postsWithLikeStatus);
    } catch (error) {
      console.error("Error fetching posts:", error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!newPost.trim() && !image) || isLoading) return;

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("content", newPost);
      if (image) formData.append("image", image);

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/posts`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewPost("");
      setImage(null);
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  const handleLikeToggle = (postId, isLiked) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              isLiked,
              likes: isLiked
                ? [...post.likes, { user: userId }]
                : post.likes.filter((like) => like.user !== userId),
            }
          : post
      )
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* New Post Form */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
      >
        <form onSubmit={handleSubmit} className="p-6">
          <div
            className={`relative border-2 border-dashed rounded-lg transition-colors ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-4 min-h-[120px] bg-transparent resize-none focus:outline-none"
            />
            {image && (
              <div className="relative mt-2 mx-4 mb-4">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-opacity"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ImagePlus size={20} />
              <span>Add Image</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
            <button
              type="submit"
              disabled={isLoading || (!newPost.trim() && !image)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all ${
                isLoading || (!newPost.trim() && !image)
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
              <span>Post</span>
            </button>
          </div>
        </form>
      </motion.div>

      {/* Posts Feed */}
      <AnimatePresence>
        {posts.map((post, index) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
          >
            <PostCard
              post={post}
              onDelete={handleDeletePost}
              onLikeToggle={handleLikeToggle}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Loading State */}
      {isLoading && posts.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-blue-500" />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && posts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">
            No posts yet. Be the first to share something!
          </p>
        </div>
      )}
    </div>
  );
};

export default Feed;
