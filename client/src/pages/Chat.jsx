import { useMemo, useState } from "react";

const BOT_RESPONSES = {
  hi: "Hello! I'm your AI assistant. How can I help you today?",
  help: "You can ask me about product recommendations, account status, or feature ideas.",
  dashboard: "Your dashboard has usage stats, query reports, and AI cards.",
  default: "Sorry, I didn't catch that. Could you rephrase?"
};

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, author: "bot", text: "Welcome to AI Chat! Type your question below." }
  ]);
  const [input, setInput] = useState("");

  const botReply = useMemo(() => (txt) => {
    const key = txt.toLowerCase().trim();
    if (!key) return "Please type a message first.";
    if (BOT_RESPONSES[key]) return BOT_RESPONSES[key];
    if (key.includes("price") || key.includes("cost")) return "We offer flexible value pricing for all plans.";
    return BOT_RESPONSES.default;
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    const userMsg = input.trim();
    if (!userMsg) return;

    const userMessage = { id: Date.now(), author: "user", text: userMsg };
    setMessages((prev) => [...prev, userMessage]);

    const reply = botReply(userMsg);
    const botMessage = { id: Date.now() + 1, author: "bot", text: reply };
    setMessages((prev) => [...prev, botMessage]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">AI Chat</h1>
        <p className="text-gray-600">Ask questions and get instant AI-made responses in this demo chat.</p>

        <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
          <div className="space-y-3 max-h-[68vh] overflow-y-auto px-2 py-1">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.author === "user" ? "justify-end" : "justify-start"}`}>
                <span className={`inline-block rounded-xl px-4 py-2 text-sm ${m.author === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}>
                  {m.text}
                </span>
              </div>
            ))}
          </div>

          <form className="mt-3 flex" onSubmit={sendMessage}>
            <input
              aria-label="Type message"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-l-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="rounded-r-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}