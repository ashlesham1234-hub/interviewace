import express from "express";
import History from "../models/History.js";

const router = express.Router();

// ================= SAVE HISTORY =================
router.post("/save", async (req, res) => {
  try {
    // ✅ Extract ALL data from frontend request
    const {
      userId,
      score,
      type,
      role,
      level,
      totalQuestions,
      marks,
      infractions,
    } = req.body;

     const newHistory = new History({
      userId,
      role,
      level,
      score,
      totalQuestions,
      marks,
      infractions,
      type, // ✅ "mcq" OR "voice"
    });

    // ✅ Save into DB
    const history = new History({
      userId,
      type: type || "mcq",
      role,              // ✅ coming from frontend
      level,             // ✅ coming from frontend
      score,
      totalQuestions,
      marks,
      infractions,
    });

    await history.save();

    res.status(200).json({ message: "Saved successfully" });

  } catch (err) {
    console.error("Save Error:", err);
    res.status(500).json({ error: err.message });
  }
});


// ================= GET USER HISTORY =================
router.get("/user/:userId", async (req, res) => {
  try {
    const history = await History.find({
      userId: req.params.userId,
    }).sort({ date: -1 });

    res.status(200).json(history);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;