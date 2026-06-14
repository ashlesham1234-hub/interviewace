import express from "express";
import Result from "../models/Result.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const results = await Result.find({ userId: req.params.userId })
      .sort({ date: 1 });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;