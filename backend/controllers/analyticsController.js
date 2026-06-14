import Interview from "../models/Interview.js";

export const getAnalytics = async (req, res) => {
  const interviews = await Interview.find();

  res.json(interviews);
};