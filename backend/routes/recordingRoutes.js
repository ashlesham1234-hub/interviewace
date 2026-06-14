import express from "express";
import multer from "multer";
import Recording from "../models/Recording.js";

const router = express.Router();

// storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".webm");
  },
});

const upload = multer({ storage });

// ✅ UPLOAD + SAVE TO DB
router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    const { userId, type } = req.body;

    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    // ✅ THIS IS THE CORRECT PLACE
    await Recording.create({
      userId,
      url: fileUrl,
      type: type || "screen",
    });

    res.json({ success: true, url: fileUrl });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;