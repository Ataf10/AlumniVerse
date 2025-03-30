import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // ✅ Check if token is present in cookies
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, No Token" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized, User Not Found" });
    }

    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).json({ message: "Unauthorized, Invalid Token" });
  }
};
