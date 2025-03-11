import { useState } from "react";
import { MoreHorizontal, Heart, MessageCircle, Share2 } from "lucide-react";

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-lg mx-auto">
      {/* Header (Profile & Options) */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img
            src={post.profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold">{post.username}</h4>
            <p className="text-xs text-gray-500">{post.timestamp}</p>
          </div>
        </div>
        <button className="text-gray-600 hover:text-gray-900">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Caption */}
      <p className="text-gray-800 mb-2">{post.caption}</p>

      {/* Image (Always Square) */}
      {post.image && (
        <div className="w-full aspect-square overflow-hidden rounded-lg">
          <img
            src={post.image}
            alt="Post"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 ${
            liked ? "text-red-500" : "text-gray-600 hover:text-red-500"
          }`}
        >
          <Heart size={20} fill={liked ? "red" : "none"} />
          <span>{likes}</span>
        </button>

        <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
          <MessageCircle size={20} />
          <span>Comment</span>
        </button>

        <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500">
          <Share2 size={20} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
