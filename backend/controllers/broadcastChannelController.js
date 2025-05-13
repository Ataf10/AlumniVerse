import BroadcastChannel from "../models/BroadcastChannel.js";
export const createChannel = async (req, res) => {
  try {
    const { companyName, description, createdBy } = req.body;

    // Cloudinary upload via multer-storage-cloudinary puts file info in req.file
    const profilePhotoUrl = req.file?.path || "";

    const newChannel = await BroadcastChannel.create({
      companyName,
      description,
      profilePhoto: profilePhotoUrl,
      createdBy,
      members: [createdBy],
    });

    res.status(201).json(newChannel);
  } catch (error) {
    console.error("Error creating channel:", error);
    res.status(500).json({ message: "Error creating channel", error });
  }
};

export const createPost = async (req, res) => {
  try {
    const { channel, postedBy, content, resumeUrl } = req.body;
    const newPost = await BroadcastPost.create({
      channel,
      postedBy,
      content,
      resumeUrl,
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

export const postComment = async (req, res) => {
  try {
    const { text, commentedBy } = req.body;
    const { postId } = req.params;

    const post = await BroadcastPost.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ text, commentedBy });
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

export const joinChannel = async (req, res) => {
  try {
    const { userId } = req.body;
    const { channelId } = req.params;
    console.log(userId, channelId);
    const channel = await BroadcastChannel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    console.log(channel);
    // Prevent duplicate joins
    if (channel.members.includes(userId)) {
      return res.status(400).json({ message: "User already a member" });
    }

    channel.members.push(userId);
    await channel.save();

    res.status(200).json({ message: "Joined channel successfully", channel });
  } catch (error) {
    res.status(500).json({ message: "Error joining channel", error });
  }
};

export const getPostsByChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    const posts = await BroadcastPost.find({ channel: channelId })
      .populate("postedBy", "name") // optional: populate user info
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
};

export const getAllChannels = async (req, res) => {
  try {
    const channels = await BroadcastChannel.find().populate(
      "createdBy",
      "name"
    );
    res.status(200).json(channels);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch channels", error });
  }
};

// controllers/broadcastChannelController.js
export const getChannels = async (req, res) => {
  try {
    const search = req.query.search || "";
    const regex = new RegExp(search, "i"); // case-insensitive search
    const channels = await BroadcastChannel.find({
      companyName: { $regex: regex },
    });
    res.status(200).json(channels);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch channels" });
  }
};
