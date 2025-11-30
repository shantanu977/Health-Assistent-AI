import { useState } from "react";
import Footer from "../components/Footer";

export default function ReportUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a report first");

    const formData = new FormData();
    formData.append("report", file);
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/reports/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    const data = await res.json();
    setLoading(false);
    setResult(data);
  };

  return (
    <div className="min-h-screen bg-[#0B1F36] text-white p-6 flex flex-col items-center">
      
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-teal-400 text-center">
        Upload Medical Report
      </h1>

      {/* Upload Card */}
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl w-full max-w-xl border border-white/20">
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-lg mb-4 cursor-pointer"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-teal-500 hover:bg-teal-400 p-3 rounded-xl font-semibold shadow-md transition"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload & Analyze"}
        </button>
      </div>

      {/* RESULT SECTION */}
      {result && (
        <div className="mt-10 w-full max-w-4xl flex flex-col gap-6">
          {/* Extracted Text */}
          <div className="bg-white/10 backdrop-blur-xl p-5 rounded-2xl shadow-md border border-white/20">
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-green-400">
              Extracted Text
            </h2>
            <div className="bg-white/20 p-4 rounded-lg max-h-80 overflow-y-auto whitespace-pre-wrap text-gray-100">
              {result.report?.extractedText || "No text found"}
            </div>
          </div>

          {/* AI Analysis */}
          <div className="bg-white/10 backdrop-blur-xl p-5 rounded-2xl shadow-md border border-white/20">
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-yellow-400">
              AI Analysis
            </h2>
            <div className="bg-white/20 p-4 rounded-lg max-h-80 overflow-y-auto whitespace-pre-wrap text-gray-100">
              {result.report?.aiAnalysis || "No analysis available"}
            </div>
          </div>
        </div>
      )}

    
    </div>
  );
}
