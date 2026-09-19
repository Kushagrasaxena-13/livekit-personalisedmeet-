import MeetingRoom from "@/src/components/meeting/MeetingRoom";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  return <MeetingRoom roomId={roomId} />;
}