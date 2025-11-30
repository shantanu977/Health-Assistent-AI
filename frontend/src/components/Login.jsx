import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, []);

  const login = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1F36] px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl p-8">
        
        <h2 className="text-3xl font-bold text-center text-teal-400 mb-6">
          Welcome Back
        </h2>

        <div className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-white font-semibold">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full px-4 py-3 bg-white/20 text-white border border-white/30 rounded-xl
                         placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-white font-semibold">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full px-4 py-3 bg-white/20 text-white border border-white/30 rounded-xl
                         placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={login}
            className="w-full py-3 bg-teal-500 text-white rounded-xl text-lg font-semibold
                       hover:bg-teal-400 active:scale-95 transition-all shadow-md"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-300 mt-3">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-teal-400 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
