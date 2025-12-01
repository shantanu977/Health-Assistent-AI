import express from "express";
import { auth } from "../middleware/auth.js";
import { getWaterStatus, addIntake, setGoal, resetToday } from "../controllers/waterController.js";

const router = express.Router();

router.get("/", auth, getWaterStatus);           // GET current status
router.post("/add", auth, addIntake);            // POST { amountMl: 250 }
router.post("/goal", auth, setGoal);             // POST { dailyGoalMl: 2500 }
router.post("/reset", auth, resetToday);         // POST to reset today's intakes

export default router;
