import { useState } from "react";

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const checkSymptoms = async () => {
    if (!symptoms.trim()) return;

    setLoading(true);
    setResult(null);

    const res = await fetch("http://localhost:5000/api/symptoms/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ symptoms }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B1F36] flex flex-col items-center px-4 py-12">
      
      {/* Card */}
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20">
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-teal-400 mb-6">
          Symptom Checker
        </h1>

        <p className="text-gray-200 text-center mb-6">
          Enter your symptoms below and get instant AI-powered insights.
        </p>

        {/* Input Box */}
        <textarea
          rows="4"
          className="w-full p-4 rounded-xl bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-teal-400 focus:outline-none placeholder-gray-300"
          placeholder="Example: fever, cough, headache, body pain"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={checkSymptoms}
          className="w-full mt-4 bg-teal-500 hover:bg-teal-400 text-white py-3 rounded-xl text-lg font-semibold transition-all active:scale-95 shadow-md"
        >
          Check Symptoms
        </button>

        {/* Loader */}
        {loading && (
          <div className="text-center mt-6">
            <div className="animate-spin h-10 w-10 border-4 border-teal-400 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-200 mt-2">Analyzing symptoms...</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-8 p-6 border rounded-2xl bg-white/10 shadow-inner border-white/20">
            <h2 className="text-2xl font-semibold text-green-400 mb-3">
              Analysis Result
            </h2>
            <p className="whitespace-pre-line text-gray-100 leading-relaxed">
              {result.analysis}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
