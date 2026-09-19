import { AccessToken } from "livekit-server-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { roomName, participantName } = await req.json();

    if (!roomName || !participantName) {
      return NextResponse.json(
        { error: "Missing room or participant name" },
        { status: 400 }
      );
    }

    const token = new AccessToken(
      process.env.LIVEKIT_API_KEY!,
      process.env.LIVEKIT_API_SECRET!,
      {
        identity: `${participantName}-${crypto.randomUUID()}`,
        name: participantName,
      }
    );
    console.log("LIVEKIT URL:", process.env.LIVEKIT_API_SECRET);

    token.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
    });

    return NextResponse.json({
      token: await token.toJwt(),
      serverUrl: process.env.LIVEKIT_URL,
    });
    


  } catch {
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}