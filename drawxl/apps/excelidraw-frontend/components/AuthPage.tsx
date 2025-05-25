"use client"
import Link from "next/link"
import { Pencil, ArrowLeft, Zap, Brush, Users } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { HTTP_BACKEND } from "@/config";
import { useRouter } from "next/navigation";


export function AuthPage({ isSignin }: {
    isSignin: boolean

}) {

    const [username , setUsername] = useState<string>("") 
    const [password ,setPassword] =useState<string>("");
    const [name , setName] = useState<string>()
     const router = useRouter();

async function checkUser() {
  const response = await axios.post(
    `${HTTP_BACKEND}/${isSignin ? "signin" : "signup"}`,
    {
      username,
      password,
      name,
    }
  );

  const token = response.data.token;

  if (isSignin) {
    // Login flow
    localStorage.setItem("token", token);
    alert("Logged in successfully!");
    router.push("/dashboard");
    console.log("Stored token:", localStorage.getItem("token"));

  } else {
    // Signup flow
    alert("Signup successful! Please login.");
    router.push("/signin");
  }
}


    return <div className="min-h-screen bg-gradient-to-br from-white to-black text-black flex flex-col relative">
        <div className="container py-8">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
            </Link>
        </div>
        <div className="ml-70 flex justify-center items-center absolute  h-[820px] w-[500px] bg-white shadow-xl rounded-xl mt-2 lg:ml-180 relative mb-10 ">

            <div className=" absolute inset-0 bg-gradient-to-r from-black to-gray-800 h-[150px] rounded-t-xl">
                <div className="bg-white rounded-full p-2 w-[55px]  mt-7 ml-55">
                    <Pencil className="h-10  text-black ml-2 py-1 " />

                </div>
                <div className="text-4xl font-bold text-white ml-47 mt-3">drawXL</div>
            </div>


            <div className=" absolute text-black font-bold text-3xl flex mb-100 ml-8">Create Your Account</div>
            <span className="absolute text-zinc-600 mb-80 text-xl ml-5">Join drawXL and start creating amazing art</span>
            <div className="mt-5 mr-6 ">
                <div className="ml-9 font-normal text-lg mt-14">Name</div>
                <input onChange={(e)=>{setName(e.target.value)}} 
                value={name}
                 type="text"
                  placeholder="email"


                   className="bg-white text-black w-[450px] h-[50px] border ml-8 rounded-xl text-zinc-600 mb-4 text-2xl text-center" />
                <div className="ml-9 font-normal text-lg ">Email</div>
                <input type="text"
                 placeholder="email"
                   onChange={(e)=>{setUsername(e.target.value)}}
                  value={username}
                className="bg-white text-black w-[450px] h-[50px] border ml-8 rounded-xl text-zinc-600 text-2xl text-center" />
                <div className="ml-9 font-normal text-lg mt-8">Password</div>
              
                <input 
                  onChange={(e)=>{setPassword(e.target.value)}}
                  placeholder="password"
                  value={password}
                 type="password"
                 className="bg-white text-black w-[450px] h-[50px] border ml-8 rounded-xl text-zinc-600 text-2xl text-center" />

            </div>
            <button className="absolute mt-140 h-[55px] w-[450px] rounded-xl bg-black text-white cursor-pointer" onClick={checkUser}>{isSignin ? "Sign in" : "Sign up"}</button>

        </div>


    </div>

}