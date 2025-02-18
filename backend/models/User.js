// User schema for login and signup
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Name of the user
    email: { type: String, unique: true, lowercase: true }, // User email (unique)
    phone: { type: String, unique: true }, // User phone (unique, only one of email/phone should be used for login)
    password: { type: String, required: true }, // Hashed password
    isAdmin: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false }, // Admin approval for users
    profilePic: { type: String, default: "" }, // Optional profile picture
    batch: { type: String, required: true }, // Example: "Batch of 2022"
    department: { type: String, required: true }, // Example: "Computer Science"
    bio: { type: String, default: "" }, // User's biography
  },
  { timestamps: true } // Created at and updated at fields
);

module.exports = mongoose.model("User", UserSchema);
