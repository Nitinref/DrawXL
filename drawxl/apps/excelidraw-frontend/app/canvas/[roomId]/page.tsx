"use client";

import { RoomCanvas } from "@/components/RoomCanvas";
import { useParams } from "next/navigation";


export default function CanvasPage() {
  const { roomId } = useParams() as { roomId: string };

  if (!roomId) return <div>Loading...</div>;

  return <RoomCanvas roomId={roomId} />;
}