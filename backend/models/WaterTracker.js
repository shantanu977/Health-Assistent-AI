import mongoose from "mongoose";

const intakeSchema = new mongoose.Schema({
  amountMl: { type: Number, required: true },   // e.g. 250
  createdAt: { type: Date, default: Date.now }
});

const waterTrackerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  dailyGoalMl: { type: Number, default: 2000 },   // default 2000 ml
  todayIntakes: [intakeSchema],
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("WaterTracker", waterTrackerSchema);
