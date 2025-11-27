// controllers/contactController.js
import Contact from "../models/Contact.js";

// @desc    Create a new contact message
// @route   POST /api/contact
// @access  Public
export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    res.status(201).json({ success: true, data: newContact });
  } catch (error) {
    console.error("Error in createContact:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// @desc    Get all contact messages (for admin panel)
// @route   GET /api/contact
// @access  Private (Admin)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error("Error in getContacts:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
