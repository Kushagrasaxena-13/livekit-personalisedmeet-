"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Video, LogIn } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [room, setRoom] = useState("");

  const createMeeting = () => {
    const id = crypto.randomUUID().slice(0, 8);
    router.push(`/room/${id}`);
  };

  const joinMeeting = () => {
    if (!room.trim()) return;
    router.push(`/room/${room.trim()}`);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="max-w-3xl text-center px-6">

        <div className="text-emerald-400 font-semibold mb-4">
          OPEN-SOURCE WEBRTC PLATFORM
        </div>

        <h1 className="text-6xl font-bold">
          Video meetings.
          <span className="text-emerald-400"> Without Zoom.</span>
        </h1>

        <p className="text-zinc-400 text-xl mt-6">
          Secure real-time video conferencing powered by WebRTC and LiveKit.
        </p>

        <div className="flex gap-3 justify-center mt-10">
          <button
            onClick={createMeeting}
            className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-xl flex gap-2 items-center"
          >
            <Video size={20} />
            Create Meeting
          </button>

          <input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Enter room ID"
            className="bg-zinc-900 border border-zinc-700 px-4 rounded-xl"
          />

          <button
            onClick={joinMeeting}
            className="border border-zinc-700 px-5 rounded-xl flex items-center gap-2"
          >
            <LogIn size={18} />
            Join
          </button>
        </div>
      </div>
    </main>
  );
}