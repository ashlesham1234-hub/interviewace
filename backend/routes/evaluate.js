import express from "express";
const router = express.Router();

// Keywords for scoring (simple AI logic)
const keywordMap = {
  "linked list": ["node", "pointer", "data", "next"],
  "binary search": ["sorted", "log", "divide", "middle"],
  "recursion": ["function", "call", "itself"],
  "load balancing": ["traffic", "servers", "distribution"],
  "microservices": ["services", "independent", "scalable"],
  "tell me about yourself": ["experience", "skills", "background"],
  "challenge": ["problem", "solution", "result"]
};

// POST /api/evaluate
router.post("/evaluate", (req, res) => {
  const { question, answer, stage } = req.body;

  if (!answer) {
    return res.json({
      score: 0,
      feedback: "No answer provided",
      correctAnswer: "Try answering the question properly"
    });
  }

  let score = 0;
  let feedback = "";
  let correctAnswer = "Refer to standard concepts";

  const q = question.toLowerCase();
  const a = answer.toLowerCase();

  // Find matching keyword set
  let matchedKeywords = [];

  for (let key in keywordMap) {
    if (q.includes(key)) {
      matchedKeywords = keywordMap[key];
      break;
    }
  }

  // Score based on keyword match
  let matchCount = 0;

  matchedKeywords.forEach(word => {
    if (a.includes(word)) {
      matchCount++;
    }
  });

  // Scoring logic
  if (matchCount >= 3) {
    score = 9;
    feedback = "Excellent answer! You covered key concepts clearly.";
  } else if (matchCount === 2) {
    score = 7;
    feedback = "Good answer, but could be more detailed.";
  } else if (matchCount === 1) {
    score = 5;
    feedback = "Average answer. Try to include more key points.";
  } else {
    score = 3;
    feedback = "Weak answer. Missing important concepts.";
  }

  // Bonus for longer structured answers
  if (answer.length > 80) {
    score += 1;
  }

  if (score > 10) score = 10;

  res.json({
    score,
    feedback,
    correctAnswer
  });
});

export default router;