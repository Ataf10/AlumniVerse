import Post from "../models/Post.js";
import User from "../models/User.js";

/* ✅ Create a Post */
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    // Handle Image Upload
    const image = req.file ? req.file.path : null;

    const post = await Post.create({
      user: req.user._id,
      content,
      image, // Save Cloudinary URL
    });

    res.status(201).json({ success: true, post });
  } catch (error) {
    console.error("Post Creation Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ✅ Get All Posts */
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Fetching Posts Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ✅ Like a Post */
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user already liked the post
    const alreadyLiked = post.likes.some(
      (like) => like.user.toString() === req.user._id.toString()
    );

    if (alreadyLiked) {
      return res.status(400).json({ message: "User already liked this post" });
    }

    // Add like
    post.likes.push({ user: req.user._id });
    await post.save();

    res
      .status(200)
      .json({ success: true, message: "Post liked", likes: post.likes.length });
  } catch (error) {
    console.error("Like Post Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ✅ Unlike a Post */
export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Remove like
    post.likes = post.likes.filter(
      (like) => like.user.toString() !== req.user._id.toString()
    );
    await post.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Post unliked",
        likes: post.likes.length,
      });
  } catch (error) {
    console.error("Unlike Post Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ✅ Delete a Post */
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the logged-in user owns the post
    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this post" });
    }

    await post.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Post Deletion Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
