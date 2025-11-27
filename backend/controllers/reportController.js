import fs from "fs";
import pdf from "pdf-parse";
import Tesseract from "tesseract.js";
import { groq } from "../utils/groqClient.js";
import Report from "../models/Report.js";

export const analyzeReport = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.userId;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("Uploaded File:", file);

    let extractedText = "";

    // ----------- PDF REPORT ---------------
    if (file.mimetype === "application/pdf") {
      const buffer = fs.readFileSync(file.path);
      const data = await pdf(buffer);
      extractedText = data.text || "";
    }

    // ----------- IMAGE REPORT -------------
    else {
      const ocr = await Tesseract.recognize(file.path, "eng");
      extractedText = ocr.data?.text || "";
    }

    // Prevent empty text crash
    if (!extractedText.trim()) {
      extractedText = "No readable text found in file.";
    }

    // ----------- AI ANALYSIS --------------
    let aiAnalysis = "No analysis generated.";

    try {
      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `Analyze this medical report text:\n\n${extractedText}`
          }
        ]
      });

      aiAnalysis =
        response?.choices?.[0]?.message?.content ||
        "AI analysis unavailable.";
    } catch (aiErr) {
      console.error("AI Analysis Error:", aiErr.message);
    }

    // ------------ SAVE IN DB -------------
    const savedReport = await Report.create({
      userId,
      filename: file.filename,
      originalName: file.originalname,
      filePath: file.path,
      fileType: file.mimetype,
      extractedText,
      aiAnalysis
    });

    // Delete uploaded file after saving
    fs.unlink(file.path, (err) => {
      if (err) console.error("File delete error:", err);
    });

    return res.json({
      success: true,
      message: "Report analyzed & saved successfully",
      report: savedReport
    });

  } catch (err) {
    console.error("Report Analyzer Error:", err);
    return res.status(500).json({
      success: false,
      error: "Report analysis failed",
      details: err.message
    });
  }
};
