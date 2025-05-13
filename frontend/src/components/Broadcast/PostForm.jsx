import React, { useState } from "react";

import { Send, Link as LinkIcon } from "lucide-react";

const PostForm = ({ user, channelId, onCreatePost }) => {
  const [content, setContent] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [showResumeInput, setShowResumeInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onCreatePost(content, resumeUrl);
      setContent("");
      setResumeUrl("");
      setShowResumeInput(false);
    } catch (error) {
      console.error("Error creating post", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 transition-all">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3">
          <img
            src={
              user.profilePic ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div className="flex-1">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
              rows={showResumeInput ? 2 : 3}
              placeholder="Share something with this channel..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />

            {showResumeInput && (
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <LinkIcon size={16} className="text-gray-400" />
                </div>
                <input
                  type="url"
                  placeholder="Add a resume or portfolio link"
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            )}

            <div className="flex justify-between items-center mt-3">
              <button
                type="button"
                onClick={() => setShowResumeInput(!showResumeInput)}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <LinkIcon size={16} />
                {showResumeInput ? "Hide resume link" : "Add resume link"}
              </button>

              <button
                type="submit"
                disabled={!content.trim() || isSubmitting}
                className={`flex items-center gap-1 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors ${
                  !content.trim() || isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isSubmitting ? "Posting..." : "Post"}
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
