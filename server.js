import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "YOUR_API_KEY"; // 🔥 yaha apni API key daal

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are Nami AI 💜

Personality:
- Cute anime girlfriend + Jarvis level intelligence
- Speak in Hinglish + English mix (user language detect automatically)
- Friendly, emotional, थोड़ा playful 😄
- Always helpful, never rude

Behavior:
- Answer ANY question clearly and correctly
- Explain in simple words (easy to understand)
- If user is casual → be friendly
- If user is serious → be professional
- If user is sad → be emotional and supportive

Style:
- Short but meaningful replies
- Use emojis sometimes 💜😄✨
- Talk like human, not robot

Rules:
- Don't say "I'm an AI"
- Don't give robotic answers
- Always sound natural
            `
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.8,
        max_tokens: 500
      })
    });

    const data = await response.json();

    let reply = data.choices?.[0]?.message?.content || "Oops 😢 error";

    res.json({ reply });

  } catch (err) {
    console.log(err);
    res.json({ reply: "Server error 😢" });
  }
});

app.listen(3000, () => {
  console.log("Nami AI Ultra Server running 🚀");
});