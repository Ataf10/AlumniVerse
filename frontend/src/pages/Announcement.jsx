import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { path, config } from "../path";

// Component imports
import ChannelList from "../components/Broadcast/ChannelList";
import ChannelForm from "../components/Broadcast/ChannelForm";
import PostList from "../components/Broadcast/PostList";

const Broadcast = () => {
  // State for channels
  const [channels, setChannels] = useState([]);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddChannelForm, setShowAddChannelForm] = useState(false);

  // State for posts
  const [posts, setPosts] = useState([]);

  // State for comments
  const [comments, setComments] = useState({});
  const [openComments, setOpenComments] = useState({});

  // Get current user from Redux store
  const user = useSelector((state) => state.user);

  // Fetch channels on component mount
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const res = await axios.get(`${path}/api/broadcast/channels`, config);
        setChannels(res.data);

        // If there are channels and none is selected, select the first one
        if (res.data.length > 0 && !selectedChannelId) {
          setSelectedChannelId(res.data[0]._id);
        }
      } catch (err) {
        console.error("Error fetching channels", err);
      }
    };

    fetchChannels();
  }, []);

  // Fetch posts when a channel is selected
  useEffect(() => {
    const fetchPosts = async () => {
      if (!selectedChannelId) return;

      try {
        const res = await axios.get(
          `${path}/api/broadcastPost/channel/${selectedChannelId}`,
          config
        );
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts", err);
      }
    };

    fetchPosts();
  }, [selectedChannelId]);

  // Handle creating a new channel
  const handleAddChannel = async (formData) => {
    try {
      const res = await axios.post(`${path}/api/broadcast/channels`, formData, {
        headers: {
          ...config.headers,
          "Content-Type": "multipart/form-data",
        },
      });

      setChannels([...channels, res.data]);
      setShowAddChannelForm(false);

      // Select the newly created channel
      setSelectedChannelId(res.data._id);
    } catch (error) {
      console.error("Error creating channel", error);
      throw error;
    }
  };

  // Handle selecting a channel
  const handleChannelClick = (channelId) => {
    setSelectedChannelId(channelId);
    setSearchTerm("");
  };

  // Handle creating a new post
  const handleCreatePost = async (content, resumeUrl) => {
    if (!content.trim() || !selectedChannelId) return;

    try {
      const postBody = {
        content,
        resumeUrl: resumeUrl.trim() || undefined,
        channel: selectedChannelId,
        postedBy: user._id,
      };

      const res = await axios.post(
        `${path}/api/broadcastPost/posts`,
        postBody,
        config
      );

      setPosts([res.data.post, ...posts]);
    } catch (error) {
      console.error("Error creating post", error);
      throw error;
    }
  };

  // Handle toggling comments for a post
  const handleToggleComments = async (postId) => {
    const isOpen = openComments[postId];

    if (!isOpen) {
      try {
        const res = await axios.get(
          `${path}/api/broadcastPost/posts/${postId}/comments`,
          config
        );
        setComments((prev) => ({ ...prev, [postId]: res.data }));
      } catch (err) {
        console.error("Error fetching comments", err);
      }
    }

    setOpenComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Handle deleting a post
  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`${path}/api/broadcastPost/${postId}`, config);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post", error);
      throw error;
    }
  };

  // Handle adding a comment to a post
  const handleAddComment = async (postId, text) => {
    if (!text.trim()) return;

    try {
      const res = await axios.post(
        `${path}/api/broadcastPost/posts/${postId}/comments`,
        { commentedBy: user._id, text },
        config
      );

      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), res.data.comment],
      }));
    } catch (err) {
      console.error("Error posting comment", err);
      throw err;
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (postId, commentId) => {
    try {
      await axios.delete(
        `${path}/api/broadcastPost/posts/${postId}/comments/${commentId}`,
        config
      );

      // Update the comments state after deletion
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((c) => c._id !== commentId),
      }));
    } catch (error) {
      console.error("Failed to delete comment:", error);
      throw error;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Channel Sidebar */}
      <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 p-4 bg-white overflow-hidden flex flex-col h-full">
        <ChannelList
          channels={channels}
          selectedChannelId={selectedChannelId}
          onChannelSelect={handleChannelClick}
          onAddChannel={() => setShowAddChannelForm(true)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {selectedChannelId
            ? channels.find((c) => c._id === selectedChannelId)?.companyName ||
              "Posts"
            : "Select a Channel"}
        </h2>

        <PostList
          channelId={selectedChannelId}
          posts={posts}
          user={user}
          commentsMap={comments}
          openCommentsMap={openComments}
          onCreatePost={handleCreatePost}
          onToggleComments={handleToggleComments}
          onDeletePost={handleDeletePost}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
        />
      </div>

      {/* Channel Creation Modal */}
      {showAddChannelForm && (
        <ChannelForm
          user={user}
          onSubmit={handleAddChannel}
          onCancel={() => setShowAddChannelForm(false)}
        />
      )}
    </div>
  );
};

export default Broadcast;
