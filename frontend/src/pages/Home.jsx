import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1A2F] to-[#0F243D] text-white">

      {/* HERO SECTION */}
      <div className="max-w-4xl mx-auto text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          AI Health Companion
        </h1>

        <p className="mt-4 text-gray-300 text-lg md:text-xl leading-relaxed">
          Your smart personal assistant for better health, daily wellness & AI insights.
        </p>
      </div>

      {/* MAIN FEATURES */}
      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3 px-6 mb-16">

        {/* Symptom Checker */}
        <Link to="/symptom-checker">
          <div className="p-6 bg-[#11263F] hover:bg-[#16304F] shadow-lg rounded-2xl border border-blue-900/40 hover:shadow-2xl transition cursor-pointer">
            <h3 className="text-lg font-semibold text-blue-300">🩺 Symptom Checker</h3>
            <p className="text-gray-300 mt-2">
              Get AI-powered insights based on your symptoms.
            </p>
          </div>
        </Link>

        {/* Report Analysis */}
        <Link to="/upload-report">
          <div className="p-6 bg-[#11263F] hover:bg-[#16304F] shadow-lg rounded-2xl border border-blue-900/40 hover:shadow-2xl transition cursor-pointer">
            <h3 className="text-lg font-semibold text-blue-300">📄 Report Analysis</h3>
            <p className="text-gray-300 mt-2">
              Upload medical reports for instant explanation.
            </p>
          </div>
        </Link>

        {/* AI Chat */}
        <Link to="/chat">
          <div className="p-6 bg-[#11263F] hover:bg-[#16304F] shadow-lg rounded-2xl border border-blue-900/40 hover:shadow-2xl transition cursor-pointer">
            <h3 className="text-lg font-semibold text-blue-300">💬 AI Chat Support</h3>
            <p className="text-gray-300 mt-2">
              Talk with an intelligent AI health assistant.
            </p>
          </div>
        </Link>
      </div>

      {/* MINI HEALTH TOOLS SECTION */}
      <h2 className="text-center text-2xl font-bold text-blue-200 mb-6">
        Daily Health Tools
      </h2>

      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-4 px-6 mb-20">

        {/* Medicine Reminder */}
        <Link to="/medicine-reminder">
          <div className="p-5 bg-[#122A45] hover:bg-[#183655] transition rounded-2xl shadow-md border border-blue-900/40 cursor-pointer">
            <h3 className="text-lg font-semibold text-blue-300">⏰ Medicine Reminder</h3>
            <p className="text-gray-300 mt-2">Set reminders & stay consistent.</p>
          </div>
        </Link>

        {/* AI Diet Planner */}
        <Link to="/diet-planner">
          <div className="p-5 bg-[#122A45] hover:bg-[#183655] transition rounded-2xl shadow-md border border-blue-900/40 cursor-pointer">
            <h3 className="text-lg font-semibold text-blue-300">🥗 AI Diet Planner</h3>
            <p className="text-gray-300 mt-2">Personalized diet plans using AI.</p>
          </div>
        </Link>

        {/* Water Tracker */}
        <Link to="/water-tracker">
          <div className="p-5 bg-[#122A45] hover:bg-[#183655] transition rounded-2xl shadow-md border border-blue-900/40 cursor-pointer">
            <h3 className="text-lg font-semibold text-blue-300">💧 Water Tracker</h3>
            <p className="text-gray-300 mt-2">Track daily water intake.</p>
          </div>
        </Link>

        {/* Wellness Dashboard */}
        <Link to="/dashboard">
          <div className="p-5 bg-[#122A45] hover:bg-[#183655] transition rounded-2xl shadow-md border border-blue-900/40 cursor-pointer">
            <h3 className="text-lg font-semibold text-blue-300">📊 Wellness Dashboard</h3>
            <p className="text-gray-300 mt-2">Monitor & maintain dashboard.</p>
          </div>
        </Link>
      </div>

      {/* CTA */}
      <div className="text-center mb-16 px-6">
        <p className="text-gray-300 text-lg">
          Begin your journey with{" "}
          <span className="text-blue-300 font-semibold">Chat</span> or{" "}
          <span className="text-blue-300 font-semibold">Upload Report</span>.
        </p>
      </div>

     </div>
  );
}
