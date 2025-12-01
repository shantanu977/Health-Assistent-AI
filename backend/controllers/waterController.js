import WaterTracker from "../models/WaterTracker.js";
import mongoose from "mongoose";

// helper: clear old days — keep only today's intakes
const isSameDay = (a, b) => {
  const da = new Date(a);
  const db = new Date(b);
  return da.getFullYear() === db.getFullYear()
    && da.getMonth() === db.getMonth()
    && da.getDate() === db.getDate();
};

export const getWaterStatus = async (req, res) => {
  try {
    const userId = req.userId;
    let tracker = await WaterTracker.findOne({ userId });

    if (!tracker) {
      tracker = await WaterTracker.create({ userId, dailyGoalMl: 2000, todayIntakes: [] });
    }

    // filter only today's intakes
    const today = new Date();
    const todaysIntakes = tracker.todayIntakes.filter(i => isSameDay(i.createdAt, today));

    const totalMl = todaysIntakes.reduce((s, i) => s + i.amountMl, 0);

    return res.json({
      success: true,
      dailyGoalMl: tracker.dailyGoalMl,
      totalMl,
      intakes: todaysIntakes
    });
  } catch (err) {
    console.error("Get water status error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const addIntake = async (req, res) => {
  try {
    const userId = req.userId;
    const { amountMl } = req.body;
    if (!amountMl || isNaN(amountMl)) {
      return res.status(400).json({ error: "amountMl is required (number)" });
    }

    let tracker = await WaterTracker.findOne({ userId });
    if (!tracker) {
      tracker = await WaterTracker.create({ userId, dailyGoalMl: 2000, todayIntakes: [] });
    }

    // Push intake
    tracker.todayIntakes.push({ amountMl: Number(amountMl) });
    tracker.updatedAt = new Date();
    await tracker.save();

    // compute total for today
    const today = new Date();
    const todaysIntakes = tracker.todayIntakes.filter(i => isSameDay(i.createdAt, today));
    const totalMl = todaysIntakes.reduce((s, i) => s + i.amountMl, 0);

    return res.json({ success: true, totalMl, dailyGoalMl: tracker.dailyGoalMl, intakes: todaysIntakes });
  } catch (err) {
    console.error("Add intake error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const setGoal = async (req, res) => {
  try {
    const userId = req.userId;
    const { dailyGoalMl } = req.body;
    if (!dailyGoalMl || isNaN(dailyGoalMl)) {
      return res.status(400).json({ error: "dailyGoalMl is required (number)" });
    }

    let tracker = await WaterTracker.findOne({ userId });
    if (!tracker) {
      tracker = await WaterTracker.create({ userId, dailyGoalMl: Number(dailyGoalMl), todayIntakes: [] });
      return res.json({ success: true, dailyGoalMl: tracker.dailyGoalMl, totalMl: 0 });
    }

    tracker.dailyGoalMl = Number(dailyGoalMl);
    tracker.updatedAt = new Date();
    await tracker.save();

    const today = new Date();
    const todaysIntakes = tracker.todayIntakes.filter(i => isSameDay(i.createdAt, today));
    const totalMl = todaysIntakes.reduce((s, i) => s + i.amountMl, 0);

    return res.json({ success: true, dailyGoalMl: tracker.dailyGoalMl, totalMl });
  } catch (err) {
    console.error("Set goal error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const resetToday = async (req, res) => {
  try {
    const userId = req.userId;
    let tracker = await WaterTracker.findOne({ userId });
    if (!tracker) {
      return res.json({ success: true, message: "Nothing to reset" });
    }

    // remove today's intakes
    const today = new Date();
    tracker.todayIntakes = tracker.todayIntakes.filter(i => !isSameDay(i.createdAt, today));
    tracker.updatedAt = new Date();
    await tracker.save();

    return res.json({ success: true, message: "Today's intakes reset", totalMl: 0 });
  } catch (err) {
    console.error("Reset error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
