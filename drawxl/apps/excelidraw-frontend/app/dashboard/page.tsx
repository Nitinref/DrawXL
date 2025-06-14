"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, ArrowRight, Loader2 } from "lucide-react";
import Card from "../Card";

export default function Home() {
  const [loading, setLoading] = useState<"create" | "join" | null>(null);
  const router = useRouter();

  const handleCreate = () => {
    setLoading("create");
    setTimeout(() => {
      router.push("/room");
    }, 1000); // simulate loading or await API
  };

  const handleJoin = () => {
    setLoading("join");
    setTimeout(() => {
      router.push("/JoinRoom");
    }, 1000); // simulate loading
  };

  return (
    <div className="bg-white min-h-screen w-full">
      {/* Navbar */}
      <div className="sticky top-0 h-[110px] w-full bg-white/10 backdrop-blur-lg z-10 shadow-md flex justify-between items-center px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <div className="bg-black rounded-full p-2">
            <Pencil className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-black">drawXL</span>
        </div>

        <div className="hidden lg:flex gap-8">
          <Link href="#features" className="text-black text-lg hover:text-xl duration-300">Features</Link>
          <Link href="#ShowCase" className="text-black text-lg hover:text-xl duration-300">Showcase</Link>
          <Link href="#Aboutus" className="text-black text-lg hover:text-xl duration-300">Aboutus</Link>
          <Link href="#contact" className="text-black text-lg hover:text-xl duration-300">Contact</Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 px-6 sm:px-12 py-10 items-center gap-10 min-h-[calc(100vh-110px)]">
        {/* Left */}
        <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black">
          <div className="mb-6">
            <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm">
              <span className="flex h-2 w-2 rounded-full bg-black"></span>
              <span className="ml-2 font-medium text-base sm:text-lg">Digital Art Reimagined</span>
            </div>
          </div>
          Unleash Your Creative Potential
          <p className="text-black mt-6 text-lg sm:text-xl md:text-2xl font-medium">
            The ultimate drawing application that transforms your ideas into stunning digital art with professional tools and intuitive controls.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={handleCreate}
              className="h-[55px] sm:h-[60px] w-full sm:w-[250px] bg-black rounded-xl flex items-center justify-center hover:bg-gray-800 transition text-white text-xl sm:text-2xl font-semibold cursor-pointer"
              disabled={loading !== null}
            >
              {loading === "create" ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  Create Room
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>

            <button
              onClick={handleJoin}
              className="h-[55px] sm:h-[60px] w-full sm:w-[250px] border rounded-xl flex items-center justify-center bg-white text-xl sm:text-2xl text-black font-semibold cursor-pointer"
              disabled={loading !== null}
            >
              {loading === "join" ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                "Join Room"
              )}
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="flex justify-center items-center">
          <img
            src="/drawxl.png"
            alt="Drawing Hero"
            className="rounded-xl shadow-xl w-[90%] max-w-[500px] lg:max-w-[600px] h-auto"
          />
        </div>
      </div>

      {/* Feature Highlight */}
      <div className="bg-black py-20 px-6 sm:px-12 text-white text-center space-y-8">
        <div className="inline-flex items-center justify-center bg-gray-800 h-[45px] px-6 rounded-3xl mx-auto text-sm sm:text-base">
          <span className="flex h-2 w-2 rounded-full bg-white mr-2"></span>
          PowerFull Features
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold">Everything You Need to Create</h2>
        <p className="text-zinc-400 text-base sm:text-xl max-w-4xl mx-auto">
          DrawXL combines powerful tools with an intuitive interface to make digital art creation accessible to everyone.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="px-6 sm:px-12 py-10">
        <Card />
      </div>
    </div>
  );
}
