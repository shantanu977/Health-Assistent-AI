import { groq } from "../utils/groqClient.js";

export const checkSymptoms = async (req, res) => {
  try {
    const userId = req.userId;
    const { symptoms } = req.body;

    if (!symptoms || symptoms.trim() === "") {
      return res.status(400).json({ error: "Symptoms input is required" });
    }

    console.log("User Symptoms:", symptoms);

    let aiAnalysis = "No analysis generated.";

    // ---------------- AI ANALYSIS ----------------
    try {
      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `
You are an experienced medical assistant.
The user is experiencing the following symptoms:

"${symptoms}"

Analyze the symptoms and provide:

1. Possible causes (simple language)
2. When the symptoms may be serious
3. What home care can help
4. When to consult a doctor

IMPORTANT:
- Do NOT prescribe medicines.
- Keep the explanation simple and safe.
- Keep formatting neat with bullet points.
`
          }
        ]
      });

      aiAnalysis =
        response?.choices?.[0]?.message?.content ||
        "AI analysis unavailable.";

    } catch (aiErr) {
      console.error("Symptom Check AI Error:", aiErr.message);
    }

    // ---------------- RESPONSE ----------------
    return res.json({
      success: true,
      analysis: aiAnalysis,
      userId,
    });

  } catch (err) {
    console.error("Symptom Checker Controller Error:", err);
    return res.status(500).json({
      success: false,
      error: "Symptom analysis failed",
      details: err.message
    });
  }
};
