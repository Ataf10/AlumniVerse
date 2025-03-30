import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState(null); // User ID to check likes

  useEffect(() => {
    fetchPosts();
    fetchUserId();
  }, []);

  const fetchUserId = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/me`, // Assuming API to get user details
        { withCredentials: true }
      );
      setUserId(response.data.user._id);
    } catch (error) {
      console.error("Error fetching user ID:", error.response?.data);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/posts`,
        { withCredentials: true }
      );
      const postsWithLikeStatus = response.data.posts.map((post) => ({
        ...post,
        isLiked: post.likes.some((like) => like.user === userId), // Check if user liked post
      }));
      setPosts(postsWithLikeStatus);
    } catch (error) {
      console.error("Error fetching posts:", error.response?.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim() && !image) return;

    try {
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

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {/* New Post Form */}
      <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded-md">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write something..."
          className="w-full p-2 border rounded-md"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mt-2"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Post
        </button>
      </form>

      {/* Display Posts */}
      <div>
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onDelete={handleDeletePost}
            onLikeToggle={handleLikeToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
