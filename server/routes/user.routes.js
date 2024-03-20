import express from "express";
import {
  forgotPassword,
  loginUser,
  logOutUser,
  registerUser,
  resetPassword,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/update").put(updateUserProfile);
router.route("/logout").get(logOutUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:resetToken").patch(resetPassword);

export default router;
