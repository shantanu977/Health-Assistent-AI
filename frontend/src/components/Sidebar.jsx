import { NavLink } from "react-router-dom";
import { FiUser, FiMessageSquare, FiFileText, FiLogOut, FiLayout } from "react-icons/fi";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg font-medium
     transition ${isActive ? "bg-blue-600 text-white shadow" : "text-gray-700 hover:bg-gray-200"}`;

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 min-h-screen bg-white shadow-md p-6 sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
          AI
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-3">
        <NavLink to="/dashboard" className={linkClass}>
          <FiLayout size={18} />
          Overview
        </NavLink>

        <NavLink to="/dashboard/profile" className={linkClass}>
          <FiUser size={18} />
          Profile
        </NavLink>

        <NavLink to="/dashboard/chats" className={linkClass}>
          <FiMessageSquare size={18} />
          Chat History
        </NavLink>

        <NavLink to="/dashboard/reports" className={linkClass}>
          <FiFileText size={18} />
          Report History
        </NavLink>

        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2 mt-6 text-red-600 hover:bg-red-100 rounded-lg font-medium transition"
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </nav>
    </aside>
  );
}
