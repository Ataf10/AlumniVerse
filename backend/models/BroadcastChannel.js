import mongoose from "mongoose";

const BroadcastChannelSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    profilePhoto: { type: String, default: "" }, // 👈 Profile photo (Cloudinary URL or similar)
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // 👈 Members list
  },
  { timestamps: true }
);

const BroadcastChannel = mongoose.model(
  "BroadcastChannel",
  BroadcastChannelSchema
);
export default BroadcastChannel;
