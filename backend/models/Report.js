import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  filename: String,
  originalName: String,
  filePath: String,
  fileType: String,
  extractedText: String,
  aiAnalysis: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Report", reportSchema);
