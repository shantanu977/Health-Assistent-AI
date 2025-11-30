import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [chats, setChats] = useState([]);
  const [reports, setReports] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch Profile
    axios
      .get("http://localhost:5000/api/dashboard/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfile(res.data));

    // Fetch Chat History
    axios
      .get("http://localhost:5000/api/dashboard/chats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setChats(res.data?.messages || []));

    // Fetch Reports
    axios
      .get("http://localhost:5000/api/dashboard/reports", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setReports(res.data || []));
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0B1F36] text-white">
      <Sidebar />

      <div className="w-full p-6 space-y-10">
        {/* Profile Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-teal-400">Profile</h2>
          {profile ? (
            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-md border border-white/20 space-y-2">
              <p><b>Name:</b> {profile.name}</p>
              <p><b>Email:</b> {profile.email}</p>
              <p><b>Joined:</b> {new Date(profile.createdAt).toDateString()}</p>
            </div>
          ) : (
            <p>Loading profile...</p>
          )}
        </section>

        {/* Chat History */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-teal-400">Chat History</h2>
            <button
              onClick={async () => {
                if (!confirm("Clear all chat history?")) return;
                await axios.delete("http://localhost:5000/api/dashboard/chats/clear", {
                  headers: { Authorization: `Bearer ${token}` },
                });
                setChats([]);
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Clear Chats
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-inner max-h-96 overflow-y-auto space-y-3 border border-white/20">
            {chats.length === 0 && <p>No chats available.</p>}
            {chats.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-teal-500 text-white ml-auto rounded-br-none"
                    : "bg-white/20 text-white rounded-bl-none"
                }`}
              >
                <b>{msg.role}:</b> {msg.content}
              </div>
            ))}
          </div>
        </section>

        {/* Report History */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-teal-400">Medical Report History</h2>
            <button
              onClick={async () => {
                if (!confirm("Delete ALL medical reports?")) return;
                await axios.delete("http://localhost:5000/api/dashboard/reports/clear", {
                  headers: { Authorization: `Bearer ${token}` },
                });
                setReports([]);
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Clear Reports
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {reports.length === 0 && <p>No reports uploaded.</p>}

            {reports.map((rep) => (
              <div
                key={rep._id}
                className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-md border border-white/20 space-y-2"
              >
                <p><b>File:</b> {rep.originalName}</p>
                <p><b>Uploaded:</b> {new Date(rep.createdAt).toLocaleString()}</p>
                <p><b>Extracted:</b> {rep.extractedText?.substring(0, 100)}...</p>

                <button
                  onClick={async () => {
                    try {
                      const res = await fetch(
                        `http://localhost:5000/api/dashboard/reports/download/${rep._id}`,
                        {
                          method: "GET",
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                          },
                        }
                      );

                      if (!res.ok) return alert("Download failed");

                      const blob = await res.blob();
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = rep.originalName;
                      document.body.appendChild(a);
                      a.click();
                      a.remove();
                      window.URL.revokeObjectURL(url);
                    } catch {
                      alert("Error downloading file");
                    }
                  }}
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                >
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
