"use client";

import { RoomCanvas } from "@/components/RoomCanvas";

export default function Canvas({
  params,
}: {
  params: {
    roomId: string;
  };
}) {
  const roomId = params.roomId; // No need for await

  return (
    <div>
      <RoomCanvas roomId={roomId} />
    </div>
  );
}