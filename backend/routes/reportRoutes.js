import express from "express";
import multer from "multer";
import { auth } from "../middleware/auth.js";
import { analyzeReport } from "../controllers/reportController.js";
import Report from "../models/Report.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", auth, upload.single("report"), analyzeReport);

router.get("/history", auth, async (req, res) => {
  const reports = await Report.find({ userId: req.userId });
  res.json(reports);
});

export default router;
