import Image from "next/image";
import Link from "next/link";
import { Pencil, ArrowRight } from "lucide-react";
import Signup from "./Signup";
import Signin from "./Signin";
import Card from "./Card";


export default function Home() {
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

        <div className="flex gap-3">
          <Signin text="Signin"  />
          <Signup text="Signup" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 px-6 sm:px-12 py-8 md:py-0 items-center min-h-[calc(100vh-110px)] gap-8">
        {/* Left */}
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-black relative">
          <div className="mb-6 md:mb-12">
            <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm">
              <span className="flex h-2 w-2 rounded-full bg-black"></span>
              <span className="ml-2 font-medium text-base sm:text-lg">Digital Art Reimagined</span>
            </div>
          </div>
          Unleash Your Creative Potential
          <p className="text-black mt-6 text-xl sm:text-2xl md:text-3xl font-medium">
            The ultimate drawing application that transforms your
            ideas into stunning digital art with professional tools
            and intuitive controls.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <div className="h-[55px] sm:h-[60px] w-full sm:w-[250px] bg-black rounded-xl flex items-center justify-center hover:bg-gray-800 transition">
              <div className="text-xl sm:text-2xl text-white font-semibold flex items-center cursor-pointer group">
              <Link href={"/signup"}>Get Started</Link> 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
            <div className="h-[55px] sm:h-[60px] w-full sm:w-[250px] border rounded-xl flex items-center justify-center bg-white">
              <div className="text-xl sm:text-2xl text-black font-semibold cursor-pointer">
                <a>Watch demo</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex justify-center items-center">
          <img
            src="/drawxl.png"
            alt="Drawing Hero"
            className="rounded-xl shadow-xl w-[90%] sm:w-[500px] lg:w-[600px] h-auto"
          />
        </div>
      </div>
      <div className="bg-black h-[395px] w-full flex relative  ">
        
          <div className=" absolute bg-gray-800 h-[45px] w-[210px] flex justify-center items-center rounded-3xl mt-14 ml-100 md:ml-100  sm:ml-60 lg:ml-210 ">
            <div> <span className="flex h-2 w-2 rounded-full bg-white"></span></div>
             <div className="ml-4 "> PowerFull Features</div>
          </div>
          <div>
        <div className="text-6xl font-bold flex justify-center items-center ml-10 lg:ml-130 mt-40 lg:mr-110">Everything You Need to Create </div>
        <div className="mt-10 text-2xl font-normal ml-10 lg:ml-95 text-zinc-500 ">DrawXL combines powerful tools with an intuitive interface to make digital art creation accessible to everyone</div>
        </div>
      </div>
         <div>
           <Card />
         </div>

       
     
    </div>
  );
}
