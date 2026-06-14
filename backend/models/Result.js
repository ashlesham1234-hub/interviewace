import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  userId: String,
  score: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

const Result = mongoose.model("Result", resultSchema);

export default Result;