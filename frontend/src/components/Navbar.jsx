import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      isActive
        ? "bg-teal-500 text-white shadow-md"
        : "text-gray-200 hover:bg-[#152c4d] hover:text-white"
    }`;

  return (
    <header className="bg-[#0B1F36] shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">

        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
            AI
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">
              AI Health Companion
            </h1>
            <p className="text-xs text-gray-300">
              Your AI-powered medical assistant
            </p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex items-center gap-3">
          <NavLink to="/" className={linkClass} end>Home</NavLink>
          <NavLink to="/chat" className={linkClass}>Chat</NavLink>
          <NavLink to="/upload-report" className={linkClass}>Upload Report</NavLink>

          {/* ⭐ Symptom Checker */}
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
