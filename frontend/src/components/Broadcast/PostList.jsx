import React from "react";
import { Inbox } from "lucide-react";
import PostCard from "./PostCard";
import PostForm from "./PostForm";

const PostList = ({
  channelId,
  posts,
  user,
  commentsMap,
  openCommentsMap,
  onCreatePost,
  onToggleComments,
  onDeletePost,
  onAddComment,
  onDeleteComment,
}) => {
  if (!channelId) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="bg-gray-100 p-4 rounded-full mb-4">
          <Inbox size={48} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700">
          Select a channel
        </h3>
        <p className="text-gray-500 mt-2">Choose a channel to view posts</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div>
        <PostForm
          user={user}
          channelId={channelId}
          onCreatePost={onCreatePost}
        />
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <Inbox size={48} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700">No posts yet</h3>
          <p className="text-gray-500 mt-2">
            Be the first to create a post in this channel
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PostForm user={user} channelId={channelId} onCreatePost={onCreatePost} />

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            currentUser={user}
            comments={commentsMap[post._id] || []}
            isCommentsOpen={openCommentsMap[post._id] || false}
            onToggleComments={() => onToggleComments(post._id)}
            onDeletePost={() => onDeletePost(post._id)}
            onAddComment={(text) => onAddComment(post._id, text)}
            onDeleteComment={(commentId) =>
              onDeleteComment(post._id, commentId)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default PostList;
