import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* HERO SECTION */}
      <div className="max-w-4xl mx-auto text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 tracking-tight">
          AI Health Companion
        </h1>

        <p className="mt-4 text-gray-600 text-lg md:text-xl leading-relaxed">
          Your intelligent partner for instant medical support & insights.
        </p>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3 px-6 mb-16">
        
        <div className="p-6 bg-white shadow-md rounded-2xl border border-blue-100 hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-blue-700">🩺 Symptom Checker</h3>
          <p className="text-gray-600 mt-2">
            Get AI-powered insights based on your symptoms.
          </p>
        </div>

        <div className="p-6 bg-white shadow-md rounded-2xl border border-blue-100 hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-blue-700">📄 Report Analysis</h3>
          <p className="text-gray-600 mt-2">
            Upload medical reports for instant explanation.
          </p>
        </div>

        <div className="p-6 bg-white shadow-md rounded-2xl border border-blue-100 hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-blue-700">💬 AI Chat Support</h3>
          <p className="text-gray-600 mt-2">
            Engage in intelligent health conversations.
          </p>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="text-center mb-16 px-6">
        <p className="text-gray-700 text-lg">
          Start your health journey by visiting <span className="text-blue-700 font-semibold">Chat</span> or <span className="text-blue-700 font-semibold">Upload Report</span>.
        </p>
      </div>


    </div>
  );
}
