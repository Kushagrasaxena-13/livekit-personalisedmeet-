"use client";

import {
  ParticipantTile,
  useTracks,
  useParticipants,
} from "@livekit/components-react";
import { Track } from "livekit-client";

export default function ParticipantGrid() {
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.ScreenShare, withPlaceholder: false },
  ]);

const participants = useParticipants();

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 overflow-auto">
      {tracks.map((track) => {
        const participant = participants.find(
  (p) => p.identity === track.participant.identity
);
const speaking = participant?.isSpeaking ?? false;

        return (
          <div
            key={`${track.participant.identity}-${track.source}`}
            className={`relative rounded-2xl overflow-hidden border-2 ${
              speaking
                ? "border-emerald-500"
                : "border-zinc-800"
            }`}
          >
            <ParticipantTile
              trackRef={track}
              className="h-full min-h-[250px]"
            />

            {speaking && (
              <span className="absolute top-3 right-3 bg-emerald-500 px-2 py-1 rounded-lg text-xs">
                Speaking
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}