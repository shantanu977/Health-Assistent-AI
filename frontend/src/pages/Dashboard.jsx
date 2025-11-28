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
    <div className="flex">
      <Sidebar />

      <div className="w-full p-6 space-y-10 bg-gray-100">
        {/* Profile Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          {profile ? (
            <div className="bg-white p-6 rounded shadow">
              <p>
                <b>Name:</b> {profile.name}
              </p>
              <p>
                <b>Email:</b> {profile.email}
              </p>
              <p>
                <b>Joined:</b> {new Date(profile.createdAt).toDateString()}
              </p>
            </div>
          ) : (
            <p>Loading profile...</p>
          )}
        </section>

        {/* Chat History */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Chat History</h2>

            <button
              onClick={async () => {
                if (!confirm("Clear all chat history?")) return;

                await axios.delete(
                  "http://localhost:5000/api/dashboard/chats/clear",
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );

                setChats([]); // instantly update UI
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Clear Chats
            </button>
          </div>

          <div className="bg-white p-4 rounded shadow space-y-3 max-h-96 overflow-y-auto">
            {chats.length === 0 && <p>No chats available.</p>}

            {chats.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded ${
                  msg.role === "user" ? "bg-blue-200" : "bg-gray-200"
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
            <h2 className="text-2xl font-bold">Medical Report History</h2>

            <button
              onClick={async () => {
                if (!confirm("Delete ALL medical reports?")) return;

                await axios.delete(
                  "http://localhost:5000/api/dashboard/reports/clear",
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );

                setReports([]); // instantly update UI
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Clear Reports
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {reports.length === 0 && <p>No reports uploaded.</p>}

            {reports.map((rep) => (
              <div key={rep._id} className="bg-white p-4 rounded shadow">
                <p>
                  <b>File:</b> {rep.originalName}
                </p>
                <p>
                  <b>Uploaded:</b> {new Date(rep.createdAt).toLocaleString()}
                </p>
                <p>
                  <b>Extracted:</b> {rep.extractedText?.substring(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
