import { groq } from "../utils/groqClient.js";

export const generateDietPlan = async (req, res) => {
  try {
    const { age, weight, height, goal, dietType } = req.body;

    if (!age || !weight || !height || !goal || !dietType) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const prompt = `
You are a certified nutrition expert.

Generate a simple, Indian-style daily diet plan.

User Details:
- Age: ${age}
- Weight: ${weight} kg
- Height: ${height} cm
- Goal: ${goal}
- Diet Preference: ${dietType}

Provide:
1. Daily calorie target  
2. Breakfast  
3. Lunch  
4. Snacks  
5. Dinner  
6. Tips (easy & safe)
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",  // ✅ correct model
      messages: [{ role: "user", content: prompt }],
    });

    const plan =
      response?.choices?.[0]?.message?.content ||
      "Unable to generate plan.";

    res.json({ success: true, plan });
  } catch (error) {
    console.error("Diet Plan AI Error:", error.message);
    res.status(500).json({ success: false, message: "AI generation failed" });
  }
};
