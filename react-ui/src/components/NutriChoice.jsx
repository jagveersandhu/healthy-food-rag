import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2, Copy, RotateCcw, Edit3 } from "lucide-react";

const NutriChoice = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef(null);

  const suggestions = [
    { label: "High protein snacks", emoji: "🍗" },
    { label: "Low carb dinner", emoji: "🥗" },
    { label: "Energy Food", emoji: "⚡" }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const processQuery = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setQuery("");
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      if (!response.ok) throw new Error("Backend not responding");

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I couldn't reach the NutriGuide server. Is main.py running?"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isLoading) {
      processQuery(query);
    }
  };

  return (
    <div className="h-screen bg-[#0f0f0f] text-white flex flex-col font-sans">

      {/* Header */}
      <div className="px-8 py-6 text-xl font-semibold text-gray-200">
        NutriGuide
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* First Load UI */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center text-center mt-24">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
                Welcome!
              </h1>
              <p className="text-2xl text-gray-500 mt-4">
                Ready to change your life?
              </p>

              <div className="w-full mt-10 bg-[#1e1e1e] rounded-2xl flex items-center px-6 py-5">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask NutriGuide..."
                  className="bg-transparent flex-1 outline-none text-lg text-gray-200 placeholder-gray-500"
                />
                <button
                  onClick={() => processQuery(query)}
                  className="ml-4 text-gray-400 hover:text-white"
                >
                  <Send size={22} />
                </button>
              </div>

              <div className="flex gap-3 mt-8 flex-wrap justify-center">
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => processQuery(item.label)}
                    className="px-5 py-2.5 bg-[#1e1e1e] hover:bg-[#2a2a2a] rounded-xl text-sm text-gray-300"
                  >
                    {item.label} {item.emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, index) => {
            const isUser = msg.role === "user";

            return (
              <div
                key={index}
                className={`flex flex-col group ${
                  isUser ? "items-end" : "items-start"
                }`}
              >
                {/* Bubble */}
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line
                    max-w-[60ch] w-fit
                    ${isUser
                      ? "bg-[#2a2a2a] text-gray-200"
                      : "bg-[#1c1c1c] text-gray-300"
                    }`}
                >
                  {msg.content}
                </div>

                {/* Actions (hover only) */}
                <div className="flex gap-3 mt-1 text-gray-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {isUser ? (
                    <>
                      <button
                        onClick={() => setQuery(msg.content)}
                        className="flex items-center gap-1 hover:text-gray-300"
                      >
                        <Edit3 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => copyToClipboard(msg.content)}
                        className="flex items-center gap-1 hover:text-gray-300"
                      >
                        <Copy size={14} /> Copy
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => copyToClipboard(msg.content)}
                        className="flex items-center gap-1 hover:text-gray-300"
                      >
                        <Copy size={14} /> Copy
                      </button>
                      <button
                        onClick={() => {
                          const lastUser = messages
                            .slice(0, index)
                            .reverse()
                            .find((m) => m.role === "user");
                          if (lastUser) processQuery(lastUser.content);
                        }}
                        className="flex items-center gap-1 hover:text-gray-300"
                      >
                        <RotateCcw size={14} /> Regenerate
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="bg-[#1c1c1c] px-4 py-3 rounded-2xl text-gray-400 flex items-center gap-2 w-fit">
              <Loader2 className="animate-spin" size={16} />
              Thinking…
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Bottom Input (Chat Mode) */}
      {messages.length > 0 && (
        <div className="bg-[#0f0f0f] p-4">
          <div className="max-w-3xl mx-auto flex items-center bg-[#1e1e1e] rounded-2xl px-6 py-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask NutriGuide..."
              className="bg-transparent flex-1 outline-none text-lg text-gray-200 placeholder-gray-500"
            />
            <button
              onClick={() => processQuery(query)}
              disabled={isLoading}
              className="ml-4 text-gray-400 hover:text-white"
            >
              <Send size={22} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutriChoice;