import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateQuestions = async (req, res) => {
  try {
    const { role, difficulty } = req.body;

    const questions = await generateFromGemini(role, difficulty);

    res.json({ questions }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate questions" });
  }
};