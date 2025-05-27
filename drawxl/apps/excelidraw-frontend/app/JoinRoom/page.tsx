"use client"
import { HTTP_BACKEND } from "@/config"
import axios from "axios"
import { useState, useEffect } from "react"
import { Pencil, ArrowRight, Users, Plus, RefreshCw, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function JoinRoom() {
    const [rooms, setRooms] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        fetchRooms()
    }, [])

    async function fetchRooms() {
        try {
            setLoading(true)
            const token = localStorage.getItem("token")
            if (!token) {
                alert("Please sign in to access rooms")
                router.push("/signin")
                return
            }

            const response = await axios.get(`${HTTP_BACKEND}/rooms`, {
                headers: { Authorization: token }
            })
            setRooms(response.data)
        } catch (error) {
            console.error("Error fetching rooms:", error)
            alert("Failed to load rooms")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Header */}
            <div className="bg-black shadow-2xl">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className="bg-white rounded-full p-3 shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                                <Pencil className="h-6 w-6 text-black" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white tracking-tight">drawXL</h1>
                                <p className="text-gray-300 text-sm">Collaborative Drawing Rooms</p>
                            </div>
                        </Link>
                        <button
                            onClick={fetchRooms}
                            className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <RefreshCw className="h-4 w-4" />
                            )}
                            Refresh
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto p-8">
                {/* Room List Container */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 rounded-full p-2">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Available Drawing Rooms</h2>
                                <p className="text-gray-300 text-sm">Join a room to start collaborating</p>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="p-16 text-center">
                            <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-gray-400" />
                            <h3 className="text-xl font-semibold text-gray-800">Loading rooms...</h3>
                        </div>
                    ) : rooms.length === 0 ? (
                        <div className="p-16 text-center">
                            <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                                <Users className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No rooms available</h3>
                            <p className="text-gray-500 mb-6">
                                Create your first room to get started with collaborative drawing!
                            </p>
                            <Link href="/room">
                                <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-all">
                                    Create New Room
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="p-6">
                            <div className="grid gap-4">
                                {rooms.map((room, index) => (
                                    <div
                                        key={room.slug}
                                        className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-6 transition-all duration-300 border border-gray-200 hover:border-black"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                                                        {index + 1}
                                                    </div>
                                                    <h3 className="text-lg font-bold text-gray-900">{room.slug}`</h3>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Users className="h-4 w-4" />
                                                    <span>{room.users?.length || 0} collaborators</span>
                                                </div>
                                            </div>
                                            <button
                                                className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-all flex items-center gap-2"
                                                onClick={() => router.push(`/canvas/${room.id}`)}
                                            >
                                                Join
                                                <ArrowRight className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Create New Room Section */}
                <div className="mt-8 bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 text-center shadow-xl">
                    <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                        <Plus className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Start Your Own Room</h3>
                    <p className="text-gray-300 mb-6 max-w-md mx-auto">
                        Create a new collaborative space and invite others to join your creative session.
                    </p>
                    <Link href="/room">
                        <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all flex items-center gap-3 mx-auto">
                            <Plus className="h-5 w-5" />
                            Create New Room
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}