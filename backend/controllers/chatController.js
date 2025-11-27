import { groq } from "../utils/groqClient.js";
import Conversation from "../models/Conversation.js";

export const chatAssistant = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.userId; // ← Use authenticated user

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Find existing conversation
    let conversation = await Conversation.findOne({ userId });

    if (!conversation) {
      conversation = new Conversation({ userId, messages: [] });
    }

    // Save user message
    conversation.messages.push({
      role: "user",
      content: message,
    });

    // Clean messages for Groq
    const cleanMessages = conversation.messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    // AI Chat
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: cleanMessages,
    });

    const aiReply = response.choices[0].message.content;

    // Save AI reply
    conversation.messages.push({
      role: "assistant",
      content: aiReply,
    });

    await conversation.save();

    res.json({
      reply: aiReply,
      conversationId: conversation._id,
    });

  } catch (err) {
    console.log("Chat error:", err);
    res.status(500).json({ error: "Chat error", details: err.message });
  }
};
