import express from "express";
import { auth } from "../middleware/auth.js";
import User from "../models/User.js";
import Conversation from "../models/Conversation.js";
import Report from "../models/Report.js";

const router = express.Router();

// Profile
router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

// Chat History
router.get("/chats", auth, async (req, res) => {
  const chats = await Conversation.findOne({ userId: req.userId });
  res.json(chats || { messages: [] });
});

// Report History
router.get("/reports", auth, async (req, res) => {
  const reports = await Report.find({ userId: req.userId });
  res.json(reports);
});

export default router;

