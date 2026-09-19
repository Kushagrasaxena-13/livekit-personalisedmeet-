"use client";

import { useLocalParticipant } from "@livekit/components-react";

export default function NetworkQuality() {
  const { localParticipant } = useLocalParticipant();
  const quality = localParticipant.connectionQuality;

  return (
    <div className="text-sm text-zinc-400">
      Network: <span className="text-white">{quality}</span>
    </div>
  );
}