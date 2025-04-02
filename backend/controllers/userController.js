import User from "../models/User.js";

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
