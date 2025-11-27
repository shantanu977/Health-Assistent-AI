import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reportRoutes from "./routes/reportRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Serve uploaded files
app.use("/uploads", express.static("uploads"));

// 🔥 API Routes

import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

app.use("/api/reports", reportRoutes);
app.use("/api/chat", chatRoutes);

// 🔥 MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/aihealth")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

// 🔥 Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});