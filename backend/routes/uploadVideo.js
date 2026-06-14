import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();

/* ===== CREATE UPLOAD FOLDER ===== */
const uploadPath = "uploads";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

/* ===== STORAGE CONFIG ===== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + ".webm");
  },
});

/* ===== FILE FILTER (ONLY VIDEO) ===== */
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only video files allowed!"), false);
  }
};

/* ===== MULTER CONFIG ===== */
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
});

/* ===== ROUTE ===== */
router.post("/upload", upload.single("video"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const videoUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    res.status(200).json({
      message: "Upload successful",
      videoUrl: videoUrl,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;