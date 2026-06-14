import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  score: {
    type: Number,
    required: true,
  },

  type: {
    type: String,
    enum: ["mcq", "voice"],
    default: "mcq",
  },

  role: {
    type: String,     // ✅ FIXED
  },

  level: {
    type: String,     // ✅ FIXED
  },

  totalQuestions: {
    type: Number,
  },

  marks: {
    type: Number,
  },

  infractions: {
    type: Number,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const History = mongoose.model("History", historySchema);

export default History;