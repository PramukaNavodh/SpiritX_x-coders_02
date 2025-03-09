"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import InputField from "@/components/InputField.jsx";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password}),
            });

            const data = await res.json();

            if (data.error) {
                setError(data.error);
            } else {
                router.push("/players");
            }
        } catch (err) {
            setError("Failed to connect to the server");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="h-screen flex items-center justify-center bg-[url('/BG_xcoders.jpg')] bg-cover bg-center bg-no-repeat">
            <div
                className=" backdrop-blur-sm bg-linear-to-b from-['D69ADE'] to-white  w-1/3 rounded-2xl py-10 px-8 shadow-2xl border space-y-6">
                <header className="flex justify-between">
                    <p className="mt-2 text-4xl text-black font-bold">Login</p>
                    <h1 className="mt-2 font-bold text-lg text-black">SPIRIT11</h1>
                </header>
                {error && <div className="block text-sm text-red-400">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField label="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <InputField label="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-black px-3.5 py-1.5 text-center text-sm font-medium text-white cursor-pointer shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
                    >
                        Login
                    </button>
                </form>

                <div className="flex items-center justify-center my-4">
                    <span className="border-b border-gray-300 w-full"></span>
                    <span className="px-2 text-gray-500 font-semibold">or</span>
                    <span className="border-b border-gray-300 w-full"></span>
                </div>

                <p className="text-center text-sm text-zinc-500">
                    Don&apos;t have an account?{" "}
                    <a
                        href="/auth/signup"
                        className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline cursor-pointer"
                    >
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}