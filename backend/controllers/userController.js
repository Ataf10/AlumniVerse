import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";

// ✅ Get User by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from request parameters

    if (!id || id.length !== 24) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from URL params
    const updateData = req.body; // Get updated form data from request body

    // Find user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData }, // Update fields dynamically
      { new: true, runValidators: true } // Return updated user & apply validation
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const fileStr = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "profile_pictures",
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadedResponse.secure_url },
      { new: true }
    );

    res.status(200).json({ message: "Profile picture updated", user });
  } catch (err) {
    console.error("Upload error", err);
    res.status(500).json({ message: "Failed to upload profile picture" });
  }
};

// Remove profile picture
export const removeProfilePicture = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        profilePic:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      },
      { new: true }
    );

    res.status(200).json({ message: "Profile picture removed", user });
  } catch (err) {
    console.error("Remove error", err);
    res.status(500).json({ message: "Failed to remove profile picture" });
  }
};

export const searchUser = async (req, res) => {
  const { query } = req.query;
  console.log("search query", query);

  if (!query) return res.status(400).send("Query is required");

  try {
    const users = await User.find({
      name: { $regex: query, $options: "i" }, // Case-insensitive search
    }).select("-password");

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
