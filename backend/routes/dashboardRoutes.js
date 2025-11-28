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

// Clear Chat History
router.delete("/chats/clear", auth, async (req, res) => {
  try {
    const conversation = await Conversation.findOne({ userId: req.userId });

    if (!conversation) {
      return res.json({ success: true, message: "No chat history found" });
    }

    conversation.messages = [];
    await conversation.save();

    res.json({ success: true, message: "Chat history cleared" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Clear ALL reports
router.delete("/reports/clear", auth, async (req, res) => {
  try {
    await Report.deleteMany({ userId: req.userId });
    res.json({ success: true, message: "All reports deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Download PDF report
router.get("/reports/download/:id", auth, async (req, res) => {
  try {
    const report = await Report.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.download(report.filePath, report.originalName);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;

