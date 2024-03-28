import express from "express";
import passport from "passport";
import axios from "axios";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import { CLIENT_URL } from "../config/server.config.js";

const router = express.Router();

//authenticate the user using google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: `${CLIENT_URL}/login/failed`,
  })
);

// forward the request to google auth server
router.get("/google", async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://accounts.google.com/o/oauth2/v2/auth",
      {
        params: req.query,
      }
    );
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
});

//register or login user to DB
router.get("/login/success", async (req, res) => {
  try {
    if (req.user) {
      const userExists = await User.findOne({ email: req.user._json.email });
      if (userExists) {
        generateToken(res, userExists._id);
        return res.status(200).json({
          status: 200,
          data: {
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            isAdmin: userExists.isAdmin,
          },
        });
      } else {
        const newUser = new User({
          name: req.user._json.name,
          email: req.user._json.email,
          password: Date.now(), //dummy password
        });
        generateToken(res, newUser._id);
        await newUser.save();
        return res.status(201).json({
          status: 201,
          data: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
          },
        });
      }
    } else {
      res.status(202).json({
        status: 202,
        message: "Not Authorized",
        details: "You are visiting the page without logging in.",
      });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
});

// login failed
router.get("login/failed", (req, res) => {
  res.status(401);
  throw new Error("Not Authorized");
});

// logout
router.get("logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect(CLIENT_URL);
  });
});

export default router;
