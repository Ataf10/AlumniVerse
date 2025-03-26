import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true, sparse: true }, // Store Google ID
    name: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true },
    phone: { type: String, unique: true, sparse: true },
    password: { type: String }, // Not required for Google sign-in
    isAdmin: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    profilePic: { type: String, default: "" },
    batch: { type: String }, // Optional (filled later)
    department: { type: String }, // Optional (filled later)
    bio: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
