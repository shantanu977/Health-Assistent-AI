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
        Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ FIXED
      },
      body: JSON.stringify({ symptoms }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg p-8 rounded-2xl">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Symptom Checker
      </h1>

      <p className="text-gray-600 mb-4 text-center">
        Enter your symptoms below and get instant AI-powered insights.
      </p>

      {/* Input Box */}
      <textarea
        rows="4"
        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Example: fever, cough, headache, body pain"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />

      {/* Button */}
      <button
        onClick={checkSymptoms}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition-all active:scale-95"
      >
        Check Symptoms
      </button>

      {/* Loader */}
      {loading && (
        <div className="text-center mt-6">
          <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-600 mt-2">Analyzing symptoms...</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-8 p-6 border rounded-xl bg-gray-50 shadow-inner">
          <h2 className="text-2xl font-semibold text-green-600 mb-3">
            Analysis Result
          </h2>
          <p className="whitespace-pre-line text-gray-700 leading-relaxed">
            {result.analysis}
          </p>
        </div>
      )}
    </div>
  );
}
