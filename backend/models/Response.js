import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema({
  interviewId: String,
  question: String,
  answer: String,
  score: Number,
  feedback: String
});

export default mongoose.model("Response", ResponseSchema);