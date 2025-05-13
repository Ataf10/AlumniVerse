import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true, sparse: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true },
    phone: { type: String, unique: true, sparse: true },
    password: { type: String },
    isAdmin: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    profilePic: { type: String, default: "" },
    batch: { type: String },
    department: { type: String },
    bio: { type: String, default: "" },
    company: { type: String, default: "" }, // <-- New field added here
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
