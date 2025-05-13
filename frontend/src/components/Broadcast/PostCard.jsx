import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, MoreVertical } from "lucide-react";

import CommentSection from "./CommentSection";
import formatDate from "../../utils/formatDate";

const DropdownMenu = ({ isOpen, onDelete, className = "" }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`absolute z-20 bg-white border rounded-md shadow-lg py-1 ${className}`}
    >
      <button
        onClick={onDelete}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
      >
        Delete Post
      </button>
    </div>
  );
};

const PostCard = ({
  post,
  currentUser,
  comments,
  isCommentsOpen,
  onToggleComments,
  onDeletePost,
  onAddComment,
  onDeleteComment,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isOwner = post.postedBy._id === currentUser._id;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-4">
        {/* Post Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <Link to={`/userProfile/${post.postedBy._id}`}>
              <img
                src={
                  post.postedBy.profilePic ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt={post.postedBy.name}
                className="w-10 h-10 rounded-full object-cover border"
              />
            </Link>
            <div>
              <Link
                to={`/userProfile/${post.postedBy._id}`}
                className="font-semibold text-gray-900 hover:underline"
              >
                {post.postedBy.name || "Anonymous"}
              </Link>
              <p className="text-xs text-gray-500">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>

          {isOwner && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Post options"
              >
                <MoreVertical size={18} />
              </button>

              <DropdownMenu
                isOpen={menuOpen}
                onDelete={onDeletePost}
                className="right-0 mt-1 w-32"
              />
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="mb-3">
          <p className="text-gray-800 whitespace-pre-line">{post.content}</p>

          {post.resumeUrl && (
            <a
              href={post.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors gap-1"
            >
              <ExternalLink size={16} />
              <span>View Resume</span>
            </a>
          )}
        </div>

        {/* Comment Section */}
        <CommentSection
          postId={post._id}
          comments={comments}
          currentUser={currentUser}
          isOpen={isCommentsOpen}
          onToggle={onToggleComments}
          onAddComment={onAddComment}
          onDeleteComment={onDeleteComment}
        />
      </div>
    </div>
  );
};

export default PostCard;
