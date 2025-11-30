import { NavLink } from "react-router-dom";
import { FiUser, FiMessageSquare, FiFileText, FiLogOut, FiLayout } from "react-icons/fi";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
     ${isActive ? "bg-teal-500 text-white shadow-lg" : "text-gray-200 hover:bg-white/10"}`;

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 min-h-screen bg-white/10 backdrop-blur-xl p-6 sticky top-0 border-r border-white/20">
      
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
          AI
        </div>
        <h2 className="text-xl font-bold text-white">Dashboard</h2>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-3">
        <NavLink to="/dashboard" className={linkClass}>
          <FiLayout size={20} />
          Overview
        </NavLink>

        <NavLink to="/dashboard/profile" className={linkClass}>
          <FiUser size={20} />
          Profile
        </NavLink>

        <NavLink to="/dashboard/chats" className={linkClass}>
          <FiMessageSquare size={20} />
          Chat History
        </NavLink>

        <NavLink to="/dashboard/reports" className={linkClass}>
          <FiFileText size={20} />
          Report History
        </NavLink>

        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 mt-6 text-red-400 hover:bg-red-500/20 rounded-xl font-medium transition-all"
        >
          <FiLogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
}
