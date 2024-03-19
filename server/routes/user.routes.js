import express from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/update").put(updateUserProfile);
router.route("/logout").get(logOutUser);

export default router;
