import React from "react";
import { Link } from "react-router-dom";
import { MoreVertical } from "lucide-react";

const DropdownMenu = ({ isOpen, onDelete, className = "" }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`absolute right-0 mt-1 w-32 bg-white border rounded-md shadow-lg z-10 py-1 ${className}`}
    >
      <button
        onClick={onDelete}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
      >
        Delete Comment
      </button>
    </div>
  );
};

const CommentItem = ({ comment, currentUser, onDeleteComment }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const isOwner = comment.commentedBy._id === currentUser._id;

  return (
    <div className="py-2 group animate-fadeIn">
      <div className="flex items-start gap-2">
        <Link to={`/userProfile/${comment.commentedBy._id}`}>
          <img
            src={
              comment.commentedBy.profilePic ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt={comment.commentedBy.name}
            className="w-7 h-7 rounded-full object-cover border flex-shrink-0"
          />
        </Link>

        <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 relative">
          <div className="flex justify-between items-start">
            <Link
              to={`/userProfile/${comment.commentedBy._id}`}
              className="font-medium text-gray-900 hover:underline mr-2"
            >
              {comment.commentedBy.name}
            </Link>

            {isOwner && (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                  <MoreVertical size={16} />
                </button>

                <DropdownMenu
                  isOpen={menuOpen}
                  onDelete={onDeleteComment}
                  className="right-0 top-full"
                />
              </div>
            )}
          </div>

          <p className="text-sm text-gray-700 mt-1 break-words">
            {comment.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
