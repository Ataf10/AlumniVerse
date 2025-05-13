import React, { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

import CommentItem from "./CommentItem";

const CommentSection = ({
  postId,
  comments,
  currentUser,
  isOpen,
  onToggle,
  onAddComment,
  onDeleteComment,
}) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAddComment(newComment);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-2">
      <button
        onClick={onToggle}
        className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors gap-1 py-1"
      >
        <MessageCircle size={18} />
        <span>
          {comments.length > 0
            ? `Comments (${comments.length})`
            : "Add Comment"}
        </span>
      </button>

      {isOpen && (
        <div className="mt-3 pt-3 border-t border-gray-100 animate-slideDown">
          {comments.length > 0 ? (
            <div className="mb-3 space-y-1 max-h-72 overflow-y-auto pr-1">
              {comments.map((comment) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  currentUser={currentUser}
                  onDeleteComment={() => onDeleteComment(comment._id)}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mb-3 italic text-center">
              Be the first to comment
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <img
              src={
                currentUser.profilePic ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover border flex-shrink-0"
            />
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                disabled={!newComment.trim() || isSubmitting}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800 ${
                  !newComment.trim() || isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
