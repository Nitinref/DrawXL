"use client"
import Link from "next/link"
import { Pencil, ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { HTTP_BACKEND } from "@/config";
import { useRouter } from "next/navigation";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();

    async function handleAuth() {
        if (!username || !password || (!isSignin && !name)) {
            setError("Please fill all fields");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post(
                `${HTTP_BACKEND}/${isSignin ? "signin" : "signup"}`,
                { username, password, name }
            );

            const token = response.data.token;

            if (isSignin) {
                localStorage.setItem("token", token);
                setSuccess("Logged in successfully!");
                setTimeout(() => router.push("/dashboard"), 1000);
            } else {
                setSuccess("Account created! Redirecting to login...");
                setTimeout(() => router.push("/signin"), 1000);
            }
        } catch (err) {
            setError(
              // @ts-expect-error

                err.response?.data?.message || 
                (isSignin ? "Invalid credentials" : "Registration failed")
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-white text-black flex flex-col relative">
            <div className="container py-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium hover:text-gray-800 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>
            </div>
            
            <div className="flex justify-center items-center w-full">
                <div className="w-full max-w-md bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    {/* Header */}
                    <div className="bg-black text-white p-6 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-white p-3 rounded-full border-2 border-black">
                                <Pencil className="h-6 w-6 text-black" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold">drawXL</h1>
                        <p className="mt-2">
                            {isSignin ? "Welcome back to your canvas" : "Join our creative community"}
                        </p>
                    </div>

                    {/* Messages */}
                    <div className="px-6 pt-4">
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-600 text-red-700">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="mb-4 p-3 bg-green-100 border-l-4 border-green-600 text-green-700">
                                {success}
                            </div>
                        )}
                    </div>

                    {/* Form */}
                    <div className="p-6">
                        {!isSignin && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Artist name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <button
                            onClick={handleAuth}
                            disabled={loading}
                            className={`w-full p-3 rounded-lg font-bold flex items-center justify-center gap-2 
                                ${loading ? 'bg-gray-300' : 'bg-black text-white hover:bg-gray-800'}
                                border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Pencil className="h-5 w-5" />
                                    {isSignin ? "Sign In" : "Create Account"}
                                </>
                            )}
                        </button>

                        <div className="mt-4 text-center text-sm">
                            {isSignin ? (
                                <p>
                                    New to drawXL?{' '}
                                    <Link href="/signup" className="font-bold underline hover:text-gray-700">
                                        Sign up
                                    </Link>
                                </p>
                            ) : (
                                <p>
                                    Already have an account?{' '}
                                    <Link href="/signin" className="font-bold underline hover:text-gray-700">
                                        Sign in
                                    </Link>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}