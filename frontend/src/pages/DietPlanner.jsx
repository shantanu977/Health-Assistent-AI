import { useState } from "react";
import axios from "axios";

export default function DietPlanner() {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    goal: "maintain",
    dietType: "balanced",
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const generatePlan = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/diet-plan",
        formData,
        { withCredentials: true }
      );
      setResponse(res.data.plan);
    } catch (err) {
      setResponse("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1A2F] to-[#0F243D] text-white p-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold text-blue-200 text-center mb-6">
          🥗 AI Diet Planner
        </h1>

        {/* FORM CARD */}
        <div className="bg-[#11263F] p-6 rounded-2xl shadow-lg border border-blue-900/40">

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={(e) => updateField("age", e.target.value)}
              className="p-3 rounded-lg bg-[#0D1E33] border border-blue-900/40 text-white"
            />

            <input
              type="number"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={(e) => updateField("weight", e.target.value)}
              className="p-3 rounded-lg bg-[#0D1E33] border border-blue-900/40 text-white"
            />

            <input
              type="number"
              placeholder="Height (cm)"
              value={formData.height}
              onChange={(e) => updateField("height", e.target.value)}
              className="p-3 rounded-lg bg-[#0D1E33] border border-blue-900/40 text-white"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <select
              className="p-3 rounded-lg bg-[#0D1E33] border border-blue-900/40 text-white"
              value={formData.goal}
              onChange={(e) => updateField("goal", e.target.value)}
            >
              <option value="maintain">Maintain Weight</option>
              <option value="lose">Lose Weight</option>
              <option value="gain">Gain Weight</option>
            </select>

            <select
              className="p-3 rounded-lg bg-[#0D1E33] border border-blue-900/40 text-white"
              value={formData.dietType}
              onChange={(e) => updateField("dietType", e.target.value)}
            >
              <option value="balanced">Balanced</option>
              <option value="veg">Vegetarian</option>
              <option value="keto">Keto</option>
              <option value="high-protein">High Protein</option>
            </select>
          </div>

          <button
            onClick={generatePlan}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold transition"
          >
            {loading ? "Generating..." : "Generate Diet Plan"}
          </button>
        </div>

        {/* OUTPUT */}
        {response && (
          <div className="mt-10 bg-[#11263F] p-6 rounded-2xl shadow-lg border border-blue-900/40 whitespace-pre-wrap">
            <h2 className="text-xl font-semibold text-blue-300 mb-3">
              Your AI Diet Plan
            </h2>
            <p className="text-gray-300">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
