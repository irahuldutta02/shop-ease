import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import { CLIENT_URL } from "../config/server.config.js";

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      return res.status(200).json({
        status: 200,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);

      return res.status(201).json({
        status: 201,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error?.message || "Something went wrong");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.body._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      generateToken(res, updatedUser._id);

      res.status(200).json({
        status: 200,
        data: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
        },
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(404);
    throw new Error("User not found");
  }
});

const logOutUser = asyncHandler((req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.cookie("connect.sid", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const resetToken = user.createResetToken();
    user.save();

    const resetUrl = `${CLIENT_URL}/reset-password/${resetToken}`;

    const message = `Forgot your password? Click here to rest your password: ${resetUrl}\nIf you have not made this request, please ignore this email!`;

    try {
      await sendEmail({
        email: user.email,
        subject: "ShopEase: Your password reset token (valid for 10 minutes)",
        message,
      });

      res.status(200).json({
        status: 200,
        message: "Token sent to email!",
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      user.save();
      res.status(500).json({
        status: 500,
        message: "There was an error sending the email. Try again later!",
      });
    }
  } catch (error) {
    res.status(404);
    throw new Error("User not found");
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "Token is invalid or has expired",
      });
    }

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    generateToken(res, user._id);

    res.status(200).json({
      status: 200,
      message: "Password reset successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid token");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    if (users) {
      res.status(200).json({
        status: 200,
        data: users,
      });
    } else {
      res.status(404);
      throw new Error("No users found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

const makeAdmin = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error("User is already an admin");
      }

      user.isAdmin = true;
      await user.save();

      res.status(200).json({
        status: 200,
        message: "User is now an admin",
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

const removeAdmin = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      if (!user.isAdmin) {
        res.status(400);
        throw new Error("User is not an admin");
      }

      if (user._id.toString() === req.user._id.toString()) {
        res.status(400);
        throw new Error("You cannot remove yourself as an admin");
      }

      user.isAdmin = false;
      await user.save();

      res.status(200).json({
        status: 200,
        message: "User is no longer an admin",
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error?.message || "Internal Server Error");
  }
});

export {
  forgotPassword,
  logOutUser,
  loginUser,
  registerUser,
  updateUserProfile,
  resetPassword,
  getAllUsers,
  makeAdmin,
  removeAdmin,
};
