import mongoose from "mongoose";

const recordingSchema = new mongoose.Schema({
  userId: String,

  url: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["screen", "voice"], // ✅ ONLY THESE TWO ALLOWED
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Recording", recordingSchema);