import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Configure Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "posts", // Cloudinary folder name
    allowed_formats: ["jpxg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

export default upload;
