import Link from "next/link";
import { Pencil, ArrowRight } from "lucide-react";
import Signup from "./Signup";
import Signin from "./Signin";
import Card from "./Card";
import Image from 'next/image';
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

        <div className="flex gap-2 sm:gap-3">
          <Signin text="Signin" />
          <Signup text="Signup" />
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
            <Link
              href="/signup"
              className="group h-[55px] sm:h-[60px] w-full sm:w-[240px] border border-black bg-black text-white rounded-full flex items-center justify-center text-lg font-semibold hover:bg-white hover:text-black transition"
            >
              <span className="flex items-center">
                GET STARTED
                <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-2" />
              </span>
            </Link>
            <div className="h-[55px] sm:h-[60px] w-full sm:w-[250px] border rounded-4xl flex items-center justify-center bg-white text-xl sm:text-2xl text-black font-semibold cursor-pointer">
              <a>Watch demo</a>
            </div>
          </div>
        </div>

        {/* Right */}
       <div className="flex justify-center items-center">
  <Image
    src="/drawxl.png"
    alt="Drawing Hero"
    width={600}  // Set to your desired display width
    height={400} // Set to your desired display height
    className="rounded-xl shadow-xl w-[90%] max-w-[500px] lg:max-w-[600px] h-auto"
    priority={true} // Optional: if this is above-the-fold hero image
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

      <footer className="bg-black text-gray-300 py-12 px-6 sm:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-black rounded-full p-1.5">
                <Pencil className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">drawXL</span>
            </div>
            <p className="text-gray-400 text-sm">
              The ultimate collaborative drawing platform for artists, designers, and creative teams.
            </p>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Product</h3>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Templates', 'Integrations', 'Roadmap'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-3">
              {['Documentation', 'Tutorials', 'Blog', 'Community', 'Support'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              {['About', 'Careers', 'Privacy', 'Terms', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-gray-800 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} DrawXL. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

