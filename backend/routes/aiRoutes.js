import express from "express";
import { generateDietPlan } from "../controllers/dietController.js";

const router = express.Router();

router.post("/diet-plan", generateDietPlan);

export default router;
