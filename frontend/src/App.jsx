import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ChatWindow from "./components/ChatWindow";
import ReportUpload from "./pages/ReportUpload";

import Login from "./components/Login";
import Register from "./components/Register";

import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatWindow />} />
          <Route path="/upload-report" element={<ReportUpload />} />
          
          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard (all pages inside it) */}
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
