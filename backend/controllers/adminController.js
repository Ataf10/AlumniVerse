import User from "../models/User.js";

// Get all users pending approval
export const getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({ isApproved: false, isAdmin: false });
    res.json(pendingUsers);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all approved users
export const getApprovedUsers = async (req, res) => {
  try {
    const approvedUsers = await User.find({ isApproved: true, isAdmin: false });
    res.json(approvedUsers);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Approve a user
export const approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    user.isApproved = true;
    await user.save();

    res.json({ message: "User approved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Promote a user to admin
export const makeUserAdmin = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.isAdmin) {
      return res.status(400).json({ message: "User is already an admin" });
    }

    user.isAdmin = true;
    await user.save();

    res.json({ message: "User promoted to admin successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const removeUserAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.isAdmin) {
      return res.status(400).json({ message: "User is not an admin" });
    }

    user.isAdmin = false;
    await user.save();

    res.json({ message: "Admin rights removed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ isAdmin: true }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const unapproveUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User unapproved successfully", user });
  } catch (err) {
    console.error("Error unapproving user:", err);
    res.status(500).json({ message: "Server error" });
  }
};
