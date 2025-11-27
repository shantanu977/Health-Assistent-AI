import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md font-medium ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">

        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            AI
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">AI Health Companion</h1>
            <p className="text-xs text-gray-500">Your AI-powered medical assistant</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex items-center gap-3">
          <NavLink to="/" className={linkClass} end>Home</NavLink>
          <NavLink to="/chat" className={linkClass}>Chat</NavLink>
          <NavLink to="/upload-report" className={linkClass}>Upload Report</NavLink>

          {/* ⭐ NEW — Symptom Checker */}
          <NavLink to="/symptom-checker" className={linkClass}>
            Symptom Checker
          </NavLink>

          <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/login" className={linkClass}>Login</NavLink>
        </nav>
      </div>
    </header>
  );
}
