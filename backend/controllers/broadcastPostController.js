import BroadcastPost from "../models/BroadcastPost.js";
import Comment from "../models/Comment.js";

export const createPost = async (req, res) => {
  try {
    const { channel, postedBy, content, resumeUrl } = req.body;

    // Create the post
    const newPost = await BroadcastPost.create({
      channel,
      postedBy,
      content,
      resumeUrl,
    });

    // Populate full user data
    const populatedPost = await BroadcastPost.findById(newPost._id)
      .populate("postedBy") // populate all fields of the user
      .populate("comments.commentedBy", "name profilePic"); // if you want comment user basic data too

    res.status(201).json({ message: "Post created", post: populatedPost });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

// Fetch all posts in a specific broadcast channel
export const getPostsByChannel = async (req, res) => {
  try {
    const { channelId } = req.params;

    const posts = await BroadcastPost.find({ channel: channelId })
      .populate("postedBy", "name profilePic")
      .populate("comments.commentedBy", "name profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

// Delete a broadcast post by its ID
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await BroadcastPost.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};

// Add a comment to a post

export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { commentedBy, text } = req.body;

    // Find the broadcast post
    const post = await BroadcastPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create the comment
    const comment = await Comment.create({
      postId,
      commentedBy,
      text,
    });

    // Add the comment ID to the post's comments array
    post.comments.push(comment._id);
    await post.save();

    // Populate the commentedBy field in the comment before sending the response
    const populatedComment = await comment.populate(
      "commentedBy",
      "name profilePic"
    );

    res
      .status(201)
      .json({ message: "Comment added", comment: populatedComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment", error });
  }
};

// Delete a specific comment from a post
export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = await BroadcastPost.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Remove the comment reference from the post
    post.comments = post.comments.filter((id) => id.toString() !== commentId);
    await post.save();

    // Delete the comment from the comments collection
    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};

export const loadComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId })
      .populate("commentedBy", "name profilePicture") // include user info
      .sort({ createdAt: 1 }); // sort by oldest to newest (optional)

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error loading comments:", error);
    res.status(500).json({ message: "Error loading comments" });
  }
};
