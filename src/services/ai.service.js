import axios from "axios";

export const askGemini = async (question) => {
  if (!process.env.GEMINI_KEY) {
    throw new Error("Gemini API key not configured");
  }

  // Use the most stable free model for qualifiers
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_KEY}`;

  try {
    const res = await axios.post(
      url,
      {
        contents: [{
          parts: [{ text: `Respond with only one single word. Question: ${question}` }]
        }]
      },
      { timeout: 10000 }
    );

    const text = res?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("No response from AI");

    // Requirement: Single-word response
    return text.trim().split(/\s+/)[0].replace(/[^\w]/g, ""); 
    
  } catch (err) {
    if (err.response?.status === 429) {
      throw new Error("Rate limit exceeded. Please wait 60 seconds and try again.");
    }
    throw new Error(err.response?.data?.error?.message || "AI Request Failed");
  }
};