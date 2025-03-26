import express from "express";
import {
  handleLogin,
  handleCompleteProfile,
  handleTokenLogin,
} from "../controllers/authController.js";
import { authorization } from "../middleware/auth.js";

const router = express.Router();

router.post("/google", handleLogin);
router.post("/complete-profile", handleCompleteProfile);
router.get("/tokenLogin", authorization, handleTokenLogin);
// router.post("/register", registerUser);

export default router;
