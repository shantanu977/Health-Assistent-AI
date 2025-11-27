import express from "express";
import { chatAssistant } from "../controllers/chatController.js";
import { auth } from "../middleware/auth.js";
import Chat from "../models/Conversation.js";


const router = express.Router();

router.post("/", auth, chatAssistant);   // <-- ADD auth HERE
router.get("/history", auth, async (req, res) => {
  const chats = await Chat.find({ userId: req.userId });
  res.json(chats);
});


export default router;
