"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import InputField from "@/components/InputField.jsx";

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password}),
            });

            const data = await res.json();

            if (data.error) {
                setError(data.error);
            } else {
                router.push("/auth/login");
            }
        } catch (err) {
            setError("Failed to connect to the server");
        }
    };

    return (
        <div
            className="h-screen flex items-center justify-center bg-[url('/BG_xcoders.jpg')] bg-cover bg-center bg-no-repeat">
            <div
                className="backdrop-blur-sm bg-linear-to-b to-white w-1/3 space-y-6 rounded-2xl px-4 py-10 shadow-md ring-1 ring-black/5 sm:px-8">
                <header className="flex justify-center">
                    <h1 className="mt-2 text-4xl text-black font-bold">Sign Up</h1>
                </header>
                {error && <div className="block text-sm text-red-400">{error}</div>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <InputField label="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <InputField label="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button
                        type="submit"
                        className="w-full rounded-md bg-black px-3.5 py-1.5 text-center text-sm font-medium text-white cursor-pointer shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="flex items-center justify-center my-4">
                    <span className="border-b border-gray-300 w-full"></span>
                    <span className="px-2 text-gray-500 font-semibold">or</span>
                    <span className="border-b border-gray-300 w-full"></span>
                </div>

                <p className="text-center text-sm text-zinc-500">
                    Already have an account?{" "}
                    <a
                        href="/auth/login"
                        className="font-medium  text-black decoration-zinc-950/20 cursor-pointer underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
                    >
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}