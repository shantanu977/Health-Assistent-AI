import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    setError("");

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
      return;
    }

    // Redirect user to login after success
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1F36] px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl p-8">
        
        <h2 className="text-3xl font-bold text-center text-teal-400 mb-6">
          Create Account
        </h2>

        {error && (
          <p className="text-red-400 bg-red-600/20 p-2 rounded-md text-center mb-4">
            {error}
          </p>
        )}

        <div className="space-y-5">
          
          {/* Full Name */}
          <div>
            <label className="text-white font-semibold">Full Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full px-4 py-3 bg-white/20 text-white border border-white/30 rounded-xl
                         placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter your name"
            />
          </div>

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
              placeholder="Create a password"
            />
          </div>

          {/* Register Button */}
          <button
            onClick={register}
            className="w-full py-3 bg-teal-500 text-white rounded-xl text-lg font-semibold
                       hover:bg-teal-400 active:scale-95 transition-all shadow-md"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-300 mt-3">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-teal-400 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}
