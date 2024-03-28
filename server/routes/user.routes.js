import express from "express";
import {
  forgotPassword,
  getAllUsers,
  loginUser,
  logOutUser,
  makeAdmin,
  registerUser,
  removeAdmin,
  resetPassword,
  updateUserProfile,
} from "../controllers/user.controller.js";

import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/update").put(updateUserProfile);
router.route("/logout").get(logOutUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:resetToken").patch(resetPassword);

router.route("/").get(protect, admin, getAllUsers);
router.route("/make-admin/:id").patch(protect, admin, makeAdmin);
router.route("/remove-admin/:id").patch(protect, admin, removeAdmin);

export default router;
