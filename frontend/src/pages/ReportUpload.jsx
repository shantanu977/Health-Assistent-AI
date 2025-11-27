import { useState } from "react";

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
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      
      <h1 className="text-3xl font-bold mb-6 text-blue-400">
        Upload Medical Report
      </h1>

      <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-xl">
        
        {/* File Input */}
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg mb-4"
        />

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload & Analyze"}
        </button>
      </div>

      {/* RESULT SECTION */}
      {result && (
  <div className="mt-10 w-full max-w-4xl">

    <h2 className="text-2xl font-bold mb-3 text-green-400">Extracted Text</h2>
    <div className="bg-gray-800 p-4 rounded-lg whitespace-pre-wrap max-h-80 overflow-y-auto">
      {result.report?.extractedText || "No text found"}
    </div>

    <h2 className="text-2xl font-bold mt-6 mb-3 text-yellow-400">AI Analysis</h2>
    <div className="bg-gray-800 p-4 rounded-lg whitespace-pre-wrap max-h-80 overflow-y-auto">
      {result.report?.aiAnalysis}
    </div>

  </div>
)}

    </div>
  );
}
