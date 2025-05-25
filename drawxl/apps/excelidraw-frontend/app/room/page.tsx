"use client"

import { HTTP_BACKEND } from "@/config"
import axios from "axios"
import { useState } from "react"
import { PencilRuler, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Room() {
  const [roomName, setRoomName] = useState<string>("")

  async function getRoom() {
    const token = localStorage.getItem("token")

    if (!token) {
      alert("Please sign in to access collaborative rooms")
      return
    }

    if (!roomName.trim()) {
      alert("Please enter a room name")
      return
    }

    try {
      const response = await axios.post(
        `${HTTP_BACKEND}/room`,
        {
          name: roomName,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      )
      console.log("Room access granted:", response.data)
      // Redirect to the room or handle success
    } catch (error) {
      console.error("Room access error:", error)
      alert("Failed to access room. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-black flex flex-col items-center justify-center p-4 font-mono">
      <div className="w-full max-w-md border-2 border-black rounded-lg shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-white">
        {/* Header */}
        <div className="bg-black text-white p-4 rounded-t-lg flex items-center gap-2  select-none">
          <PencilRuler className="h-6 w-6" />
          <h1 className="text-xl font-bold">COLLABORATIVE DRAWING ROOM</h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-black">ROOM NAME</label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black"
              placeholder="Enter room name"
            />
          </div>

         <Link href={"/JoinRoom"}> <button
            onClick={getRoom}
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 px-4 rounded-md border-2 border-black hover:bg-white hover:text-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all duration-300 ease-in-out cursor-pointer"
          >
            <span>CREATE ROOM</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          </Link>
        </div>

        {/* Footer */}
        <div className="bg-black text-white text-xs p-2 text-center rounded-b-lg select-none">
          Draw together in real-time with collaborative tools
        </div>
      </div>
    </div>
  )
}
