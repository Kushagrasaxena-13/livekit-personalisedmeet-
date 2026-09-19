"use client";

import { useState } from "react";
import {
  LiveKitRoom,
  useParticipants,
} from "@livekit/components-react";

import "@livekit/components-styles";

import ParticipantGrid from "./ParticipantGrid";
import Controls from "./Controls";
import ChatPanel from "./ChatPanel";
import NetworkQuality from "./NetworkQuality";

function MeetingHeader({
  roomId,
  toggleChat,
  chatOpen,
}: {
  roomId: string;
  toggleChat: () => void;
  chatOpen: boolean;
}) {
  const participants = useParticipants();

  return (
    <header className="h-16 px-5 flex items-center justify-between border-b border-zinc-800 bg-zinc-900">
      <div>
        <h2 className="font-bold text-lg">
          MeetFlow
        </h2>

        <div className="flex items-center gap-3">
          <p className="text-xs text-zinc-400">
            Room: {roomId} • {participants.length} participant(s)
          </p>

          <NetworkQuality />
        </div>
      </div>

      <button
        onClick={toggleChat}
        className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl"
      >
        {chatOpen ? "Close Chat" : "Chat"}
      </button>
    </header>
  );
}

export default function MeetingRoom({
  roomId,
}: {
  roomId: string;
}) {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [serverUrl, setServerUrl] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  async function join() {
    if (!name.trim()) return;

    try {
      const res = await fetch("/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName: roomId,
          participantName: name.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Token error:", data);
        return;
      }

      setToken(data.token);
      setServerUrl(data.serverUrl);
    } catch (error) {
      console.error("Join error:", error);
    }
  }

  if (!token) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="w-96 max-w-[90%]">
          <h1 className="text-3xl font-bold mb-2">
            Join Meeting
          </h1>

          <p className="text-zinc-400 mb-6">
            Room: {roomId}
          </p>

          <input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                join();
              }
            }}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 outline-none focus:border-emerald-500"
          />

          <button
            disabled={!name.trim()}
            onClick={join}
            className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 p-3 rounded-xl font-semibold disabled:opacity-50"
          >
            Join Meeting
          </button>
        </div>
      </main>
    );
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={serverUrl}
      connect={true}
      video={true}
      audio={true}
      className="h-screen"
      data-lk-theme="default"
    >
      <div className="h-screen flex flex-col bg-zinc-950 text-white">

        <MeetingHeader
          roomId={roomId}
          chatOpen={chatOpen}
          toggleChat={() =>
            setChatOpen((previous) => !previous)
          }
        />

        <div className="flex flex-1 overflow-hidden">
          <ParticipantGrid />

          {chatOpen && <ChatPanel />}
        </div>

        <Controls />

      </div>
    </LiveKitRoom>
  );
}