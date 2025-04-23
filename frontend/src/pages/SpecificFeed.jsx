import { useEffect, useState } from "react";
import axios from "axios";
import { path, config } from "../path";
import PostCard from "../components/PostCard";
const SpecificFeed = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${path}/posts`, config);
        const filteredPosts = response.data.posts.filter(
          (post) => post.user._id === userId
        );
        setPosts(filteredPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchPosts();
  }, [userId]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-lg shadow-sm">
          <p className="text-lg font-medium">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <p>No posts available for this user.</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
};

export default SpecificFeed;
