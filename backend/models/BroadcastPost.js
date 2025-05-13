import mongoose from "mongoose";

const BroadcastPostSchema = new mongoose.Schema(
  {
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BroadcastChannel",
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    resumeUrl: {
      type: String,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", // 👈 Reference to Comment model
      },
    ],
  },
  { timestamps: true }
);

const BroadcastPost = mongoose.model("BroadcastPost", BroadcastPostSchema);
export default BroadcastPost;
