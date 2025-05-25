"use client"
import { HTTP_BACKEND } from "@/config"
import axios from "axios"
import { useState } from "react"
import { Pencil, ArrowRight, Users } from "lucide-react"
import { redirect } from "next/dist/server/api-utils"
import { join } from "path"
import { useRouter } from "next/navigation";
import Link from "next/link"
export default function JoinRoom() {
    const [rooms, setRooms] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    async function getRoom() {
        try {
            setLoading(true)
            const token = localStorage.getItem("token")
            if (!token) {
                alert("Please sign in to access rooms")
                return
            }

            const response = await axios.get(`${HTTP_BACKEND}/rooms`, {
                headers: { Authorization: token }
            })
            const roomId = response.data.roomId
            setRooms(response.data)
        } catch (error) {
            console.error("Error fetching rooms:", error)
            alert("Failed to load rooms")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-black text-white p-6">
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="bg-white rounded-full p-2">
                            <Pencil className="h-5 w-5 text-black" />
                        </div>
                        <h1 className="text-xl font-bold">drawXL Rooms</h1>
                    </div>
                    <button
                        onClick={getRoom}
                        className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Refresh Rooms"}
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Room List */}
            <div className="max-w-4xl mx-auto p-6">
                <div className="border-2 border-black rounded-lg overflow-hidden">
                    <div className="bg-black text-white p-3 flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        <h2 className="font-medium">Available Drawing Rooms</h2>
                    </div>

                    {rooms.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            {loading ? "Loading rooms..." : "No rooms available. Create one to get started!"}
                        </div>
                    ) : (
                        <ul className="divide-y divide-black text-black">
                            {rooms.map((room) => (
                                <li
                                    key={room.slug}
                                    className="p-4 hover:bg-gray-50 transition cursor-pointer flex justify-between items-center"
                                >
                                    <div>
                                        <h3 className="font-medium">{room.slug}</h3>
                                        <h3 className="font-medium">{room.id}</h3>
                                        <p className="text-sm text-gray-500">
                                            {room.users?.length || 0} collaborators
                                        </p>
                                    </div>
                                    <button
                                        className="bg-black text-white px-3 py-1 rounded-md text-sm hover:bg-gray-800 transition"
                                        onClick={() => router.push(`/canvas/${room.id}`)}
                                    >
                                        Join
                                    </button>

                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Create New Room */}
                <div className="mt-8 border-2 border-black rounded-lg p-6 text-center">
                    <h3 className="font-medium mb-4">Can't find what you're looking for?</h3>
                   <Link href={"/room"}> <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
                        Create New Room

                    </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}