import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Google OAuth Login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  (req, res) => {
    // Generate JWT
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Redirect with Token
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:3000");
  });
});

export default router;
