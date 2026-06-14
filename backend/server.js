import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import historyRoutes from "./routes/history.js";
import uploadRoute from "./routes/uploadVideo.js";
import profileRoutes from "./routes/profileRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import evaluateRoutes from "./routes/evaluate.js";
import questionRoutes from "./routes/question.js";
import path from "path";
import { fileURLToPath } from "url";
import recordingRoutes from "./routes/recordingRoutes.js";

const app = express();

/* REQUIRED FOR STATIC VIDEO ACCESS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/history",historyRoutes);
app.use("/uploads", express("uploads"));
app.use("/api",uploadRoute);
app.use("/api", questionRoutes);
app.use("/api",profileRoutes);
app.use("/api/results", resultRoutes);
app.use("/api", evaluateRoutes);
app.use("/api/recordings", recordingRoutes);

app.get("/", (req, res) => {
  res.send("AI Interview Simulator API Running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});