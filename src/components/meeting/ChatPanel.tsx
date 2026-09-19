"use client";

import { useChat } from "@livekit/components-react";
import { useState } from "react";

export default function ChatPanel() {
  const { chatMessages, send } = useChat();
  const [message, setMessage] = useState("");

  async function sendMessage() {
    if (!message.trim()) return;
    await send(message);
    setMessage("");
  }

  return (
    <aside className="w-80 bg-zinc-900 p-4 flex flex-col">
      <h2 className="font-bold text-xl mb-4">Meeting Chat</h2>

      <div className="flex-1 overflow-y-auto space-y-3">
        {chatMessages.map((msg) => (
          <div key={msg.timestamp} className="bg-zinc-800 p-3 rounded-xl">
            <p className="text-emerald-400 text-sm">
              {msg.from?.name || "Participant"}
            </p>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Message..."
          className="flex-1 bg-zinc-800 p-3 rounded-xl"
        />

        <button onClick={sendMessage} className="bg-emerald-500 px-4 rounded-xl">
          Send
        </button>
      </div>
    </aside>
  );
}