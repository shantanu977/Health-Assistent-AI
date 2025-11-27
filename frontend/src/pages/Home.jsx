import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto text-center mt-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        Welcome to AI Health Companion
      </h1>

      <p className="text-gray-600 text-lg leading-relaxed">
        Your personal AI-powered assistant for:
      </p>

      <ul className="mt-5 text-gray-700 text-lg space-y-2">
        <li>✔ Smart symptom checking</li>
        <li>✔ AI medical report analysis</li>
        
        <li>✔ Chat-based medical guidance</li>
      </ul>

      <p className="mt-6 text-gray-500">
        Start by navigating to Chat or Upload Report.
      </p>
      <Footer />
    </div>
  );
}
