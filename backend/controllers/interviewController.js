import Interview from "../models/Interview.js";

export const startInterview = async (req, res) => {
  const { userId, role } = req.body;

  const interview = await Interview.create({
    userId,
    role,
    score: 0
  });

  res.json(interview);
};