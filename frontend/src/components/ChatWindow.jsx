import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"; // <-- include Navbar
import Footer from "./Footer";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat",
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const aiMessage = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.log("Chat frontend error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Server error." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      

      <div className="flex justify-center items-center p-3">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-5 mt-4">

          <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">
            AI Health Assistant
          </h2>

          <div className="h-[450px] overflow-y-auto bg-gray-50 p-4 rounded-xl space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl max-w-[80%] text-sm ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="p-3 max-w-[60%] bg-gray-300 text-gray-700 rounded-xl">
                Typing…
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          <div className="flex gap-2 mt-4">
            <input
              type="text"
              value={input}
              placeholder="Ask about your health..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              onClick={sendMessage}
              className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatWindow;
