import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({

  userId:{
    type:String,
    required:true
  },

  role:{
    type:String,
    required:true
  },

  score:{
    type:Number
  },

  totalQuestions:{
    type:Number
  },

  date:{
    type:Date,
    default:Date.now
  }

});

export default mongoose.model("Interview", interviewSchema);