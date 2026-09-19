"use client";

import {
  useLocalParticipant,
  useRoomContext,
} from "@livekit/components-react";
import { Copy } from "lucide-react";

import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  PhoneOff,
} from "lucide-react";

import { useRouter } from "next/navigation";

export default function Controls() {
  const { localParticipant } = useLocalParticipant();
  const room = useRoomContext();
  const router = useRouter();

  const mic = localParticipant.isMicrophoneEnabled;
  const camera = localParticipant.isCameraEnabled;
  const screen = localParticipant.isScreenShareEnabled;
  const copyInvite = async () => {
  await navigator.clipboard.writeText(window.location.href);
};

  return (
    <div className="flex justify-center items-center gap-4 p-4 bg-zinc-900">

      <button
        onClick={() =>
          localParticipant.setMicrophoneEnabled(!mic)
        }
        className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-full"
      >
        {mic ? <Mic size={22} /> : <MicOff size={22} />}
      </button>

      <button
        onClick={() =>
          localParticipant.setCameraEnabled(!camera)
        }
        className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-full"
      >
        {camera ? <Video size={22} /> : <VideoOff size={22} />}
      </button>

      <button
  onClick={copyInvite}
  title="Copy meeting link"
  className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-full"
>
  <Copy size={22} />
</button>

      <button
        onClick={() =>
          localParticipant.setScreenShareEnabled(!screen)
        }
        className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-full"
      >
        <MonitorUp size={22} />
      </button>

      <button
        onClick={() => {
          room.disconnect();
          router.push("/");
        }}
        className="p-3 bg-red-600 hover:bg-red-700 rounded-full"
      >
        <PhoneOff size={22} />
      </button>

    </div>
  );
}