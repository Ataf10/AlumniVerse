import express from "express";
import {
  getPendingUsers,
  getApprovedUsers,
  approveUser,
  deleteUser,
  makeUserAdmin,
  removeUserAdmin,
  getAdmins,
  unapproveUser,
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleWare.js";

const router = express.Router();

// Get pending users
router.get("/pending", protect, getPendingUsers);

// Get approved users
router.get("/approved", protect, getApprovedUsers);

// Approve a user
router.post("/approve/:id", protect, approveUser);

// Delete a user
router.delete("/delete/:id", protect, deleteUser);

// Promote a user to admin
router.put("/make-admin/:id", protect, makeUserAdmin);

router.put("/remove-admin/:id", protect, removeUserAdmin);

router.put("/unapprove/:id", protect, unapproveUser);

router.get("/admins", protect, getAdmins); // protect this route if needed

export default router;
