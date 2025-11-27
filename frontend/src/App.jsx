import { Routes, Route } from "react-router-dom";
import ChatWindow from "./components/ChatWindow";
import ReportUpload from "./pages/ReportUpload";
import Navbar from "./components/Navbar";
import Login from "./components/Login"; 
import Register from "./components/Register";
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-6">
        <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} /> 
    <Route path="/" element={<ChatWindow />} />
  <Route path="/upload-report" element={<ReportUpload />} />
</Routes>

      </main>
    </div>
  );
}

export default App;
