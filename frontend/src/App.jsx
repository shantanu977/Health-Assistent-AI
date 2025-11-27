import { Routes, Route } from "react-router-dom";
import ChatWindow from "./components/ChatWindow";
import ReportUpload from "./pages/ReportUpload";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SymptomChecker from "./pages/SymptomChecker";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow p-6">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/symptom-checker"
            element={
              <ProtectedRoute>
                <SymptomChecker />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatWindow />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload-report"
            element={
              <ProtectedRoute>
                <ReportUpload />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
