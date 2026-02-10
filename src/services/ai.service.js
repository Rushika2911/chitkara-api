import axios from "axios";

export const askGemini = async (question) => {
  if (typeof question !== "string" || !question.trim()) {
    throw new Error("AI expects a non-empty string");
  }

  if (!process.env.GEMINI_KEY) {
    throw new Error("Gemini API key not configured");
  }
const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_KEY}`;


  const res = await axios.post(
    url,
    {
      contents: [
        {
          parts: [{ text: question }]
        }
      ]
    },
    {
      headers: { "Content-Type": "application/json" },
      timeout: 15000
    }
  );

  const text =
    res?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("No response from AI");
  }

  // Return single-word as required
  return text.trim().split(/\s+/)[0];
};
