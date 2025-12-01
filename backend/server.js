import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reportRoutes from "./routes/reportRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import mongoose from "mongoose";
import symptomRoutes from "./routes/symptoms.js";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import waterRoutes from "./routes/waterRoutes.js";

dotenv.config();

const app = express();

// ✅ FIXED CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());

// Parse JSON
app.use(express.json());

// Serve uploads folder
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/symptoms", symptomRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/water", waterRoutes);

// MongoDB
mongoose
  .connect("mongodb://localhost:27017/aihealth")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
