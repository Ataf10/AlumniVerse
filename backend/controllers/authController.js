import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

dotenv.config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/* 🔹 Helper Function: Generate JWT */
const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

/* ============================
✅ Register User
============================ */

// User Registration (Manual Signup)
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password, phoneNumber } = req.body;

//     // ✅ Validate Inputs
//     if (!name || !email || !password || !phoneNumber) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // ✅ Check if User Already Exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // ✅ Hash Password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // ✅ Create User
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       phoneNumber, // ✅ Store hashed password
//     });

//     await newUser.save();

//     res
//       .status(201)
//       .json({ message: "User registered successfully", user: newUser });
//   } catch (error) {
//     console.error("Registration Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

/* ============================
✅ Login User
============================ */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

/* ============================
✅ Get Current User
============================ */
// export const getCurrentUser = async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token)
//       return res
//         .status(401)
//         .json({ message: "No token, authorization denied" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select("-password");

//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.json(user);
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token", error });
//   }
// };

export const handleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ success: false, message: "Token missing" });
    }

    // Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Check if user already exists
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      // Create new user
      user = await User.create({
        googleId: payload.sub,
        name: payload.name,
        email: payload.email,
        profilePic: payload.picture,
      });
    }

    // Generate JWT Token
    const jwtToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // Redirect logic
    if (!user.batch || !user.department) {
      return res.json({ success: true, redirect: "complete-profile" });
    } else {
      return res.json({ success: true, redirect: "feed" });
    }
  } catch (error) {
    console.error("Google Auth Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Google authentication failed" });
  }
};

export const handleCompleteProfile = async (req, res) => {
  try {
    const { batch, department, phone, bio } = req.body;
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.batch = batch;
    user.department = department;
    user.bio = bio;
    user.phone = phone;
    await user.save();

    res.json({ success: true, redirect: "feed" });
  } catch (error) {
    console.error("Profile Completion Error:", error);
    res.status(500).json({ success: false, message: "Profile update failed" });
  }
};

export const handleTokenLogin = async (req, res) => {
  const token = req.token;
  let email, _id;
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        console.log(`err`);
        return res.status(400).json({ error: "Authorization Failed" });
      }

      email = data.email;
      _id = data._id;
    });
    const user = await User.findById(_id);

    return res
      .status(200)
      .json({
        email: user.email,
        _id: user._id,
        isApproved: user.isApproved,
        isAdmin: user.isAdmin,
      });
  } catch (error) {
    return res.status(400).json({ error: "Authorization failed" }); // ✅ Single response
  }
};
