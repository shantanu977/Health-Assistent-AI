import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

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
    <div className="min-h-screen bg-[#0B1F36] flex flex-col">
      
      {/* CHAT CONTAINER */}
      <div className="flex justify-center mt-10 px-4 flex-1">
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/10">

          {/* Chat Header */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold text-white">AI Health Assistant</h2>
            <p className="text-gray-300 text-sm">
              Ask medical questions, symptoms, or reports.
            </p>
          </div>

          {/* Message Area */}
          <div className="h-[500px] overflow-y-auto bg-white/5 p-4 rounded-xl space-y-4 border border-white/10">

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm shadow-md ${
                  msg.role === "user"
                    ? "bg-teal-500 text-white ml-auto rounded-br-none"
                    : "bg-white/20 text-white backdrop-blur-md border border-white/20 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="px-4 py-3 bg-white/20 text-white rounded-2xl w-fit border border-white/20">
                Typing…
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Box */}
          <div className="flex gap-3 mt-5">
            <input
              type="text"
              value={input}
              placeholder="Ask something about your health..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-3 rounded-xl bg-white/10 text-white border border-white/20
                         placeholder-gray-300 outline-none focus:ring-2 focus:ring-teal-400"
            />

            <button
              onClick={sendMessage}
              className="px-6 py-3 rounded-xl bg-teal-500 text-white font-semibold
                         hover:bg-teal-400 transition shadow-lg"
            >
              Send
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
