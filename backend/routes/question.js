import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// ✅ Groq setup
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// ✅ GET AI Questions (MCQ + Q&A)
router.get("/questions", async (req, res) => {
  try {
    const { role, difficulty, stage, type } = req.query;

    let prompt = "";

    // ================= MCQ =================
    if (type === "mcq" || !type) {
      prompt = `
STRICT RULES:
- Return ONLY valid JSON
- No explanation
- No extra text

Generate 5 ${difficulty} level ${stage} interview MCQs for a ${role} role.

Format:
{
  "questions": [
    {
      "question": "string",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "answer": "A"
    }
  ]
}
`;
    }

    // ================= VOICE / Q&A =================
    if (type === "voice" || type === "qa") {
      prompt = `
STRICT RULES:
- Return ONLY valid JSON
- No explanation
- No extra text

Generate 1 ${difficulty} level ${stage} interview question for a ${role} role.

This should be an open-ended question (NOT MCQ).

Format:
{
  "questions": [
    {
      "question": "string"
    }
  ]
}
`;
    }

    // 🔥 Get working model dynamically
    const modelsList = await groq.models.list();

    const chatModel = modelsList.data.find(m =>
      m.id.includes("llama") || m.id.includes("mixtral")
    );

    const model = chatModel?.id || modelsList.data[0]?.id;

    if (!model) {
      return res.json({ questions: [] });
    }

    console.log("Using model:", model);

    // ✅ Generate response
    const response = await groq.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content: "You are an expert technical interviewer.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    let text = response.choices[0].message.content;

    // ✅ Extract JSON safely
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      return res.json({ questions: [] });
    }

    const jsonString = text.substring(jsonStart, jsonEnd + 1);
    const data = JSON.parse(jsonString);

    res.json(data);

  } catch (error) {
    console.error("Groq Error:", error);

    // 🛡️ fallback
    res.json({
      questions: [
        {
          question: "Explain what JavaScript is and where it is used."
        }
      ]
    });
  }
});

export default router;