import express from "express";
import { auth } from "../middleware/auth.js";
import { checkSymptoms } from "../controllers/symptomController.js";

const router = express.Router();

// Protected Route
router.post("/check", auth, checkSymptoms);

export default router;

