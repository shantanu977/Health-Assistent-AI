import { useEffect, useState } from "react";
import axios from "axios";

export default function WaterTracker() {
  const [goalMl, setGoalMl] = useState(2000);
  const [totalMl, setTotalMl] = useState(0);
  const [intakes, setIntakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customGoal, setCustomGoal] = useState("");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchStatus = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/water", { headers });
      setGoalMl(res.data.dailyGoalMl || 2000);
      setTotalMl(res.data.totalMl || 0);
      setIntakes(res.data.intakes || []);
    } catch (err) {
      console.error("Fetch water status error:", err);
    }
  };

  useEffect(() => {
    fetchStatus();
    // eslint-disable-next-line
  }, []);

  const addAmount = async (amount) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/water/add", { amountMl: amount }, { headers });
      setTotalMl(res.data.totalMl);
      setIntakes(res.data.intakes);
    } catch (err) {
      console.error("Add intake error:", err);
    }
    setLoading(false);
  };

  const saveGoal = async () => {
    if (!customGoal || isNaN(customGoal)) return alert("Enter goal in ml");
    try {
      const res = await axios.post("http://localhost:5000/api/water/goal", { dailyGoalMl: Number(customGoal) }, { headers });
      setGoalMl(res.data.dailyGoalMl);
      setCustomGoal("");
    } catch (err) {
      console.error("Set goal error:", err);
    }
  };

  const resetToday = async () => {
    if (!confirm("Clear today's water log?")) return;
    try {
      await axios.post("http://localhost:5000/api/water/reset", {}, { headers });
      setTotalMl(0);
      setIntakes([]);
    } catch (err) {
      console.error("Reset error:", err);
    }
  };

  const pct = Math.min(100, Math.round((totalMl / goalMl) * 100));

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded-2xl shadow">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">Water Tracker</h1>

      <div className="mb-4 text-center">
        <p className="text-gray-700">Goal: <b>{(goalMl/1000).toFixed(2)} L</b></p>
        <p className="text-gray-700">Consumed: <b>{(totalMl/1000).toFixed(2)} L</b></p>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-4">
        <div className="h-4 bg-blue-600" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-sm text-center text-gray-600 mb-4">{pct}% of daily goal</p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <button onClick={() => addAmount(100)} disabled={loading} className="py-2 rounded bg-blue-50 hover:bg-blue-100">+100 ml</button>
        <button onClick={() => addAmount(250)} disabled={loading} className="py-2 rounded bg-blue-50 hover:bg-blue-100">+250 ml</button>
        <button onClick={() => addAmount(500)} disabled={loading} className="py-2 rounded bg-blue-50 hover:bg-blue-100">+500 ml</button>
      </div>

      <div className="flex gap-2 mb-4">
        <input value={customGoal} onChange={(e) => setCustomGoal(e.target.value)} placeholder="Set goal (ml)" className="flex-1 px-3 py-2 rounded border" />
        <button onClick={saveGoal} className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Today log</h3>
        <button onClick={resetToday} className="text-sm text-red-600">Reset</button>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {intakes.length === 0 && <p className="text-sm text-gray-500">No intakes logged yet.</p>}
        {intakes.map((it, i) => (
          <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded">
            <div>
              <div className="text-sm font-medium">{(it.amountMl)} ml</div>
              <div className="text-xs text-gray-500">{new Date(it.createdAt).toLocaleTimeString()}</div>
            </div>
            <div className="text-xs text-gray-400">{/* optional */}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

