"use client"

// import {useEffect, useState} from "react";
// import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

const Login = ({href}) => {
        // const [username, setUsername] = useState("");
        // const [password, setPassword] = useState("");
        // const [error, setError] = useState("");
        // const [isLoading, setIsLoading] = useState(false);
        // const router = useRouter();
        // const {data: session} = useSession();

        // useEffect(() => {
        //     if (session) {
        //         redirectBasedOnRole(session.user.role);
        //     }
        // }, [session]);

        // const redirectBasedOnRole = (role) => {
        //     if (role === "TUTOR") {
        //         router.push('/portal/tutors/classes');
        //     } else if (role === 'STUDENT') {
        //         router.push('/portal/students/classes');
        //     } else if (role === 'ADMIN') {
        //         router.push('/portal/tutors');
        //     }
        // };

        // const handleSubmit = async (e) => {
        //     e.preventDefault();
        //     setIsLoading(true);
        //     setError("");

        //     try {
        //         const result = await signIn("credentials", {
        //             username,
        //             password,
        //             redirect: false,
        //         });

        //         if (result.error) {
        //             setError(result.error);
        //         } else {
        //             router.refresh();
        //         }
        //     } catch (err) {
        //         setError("An unexpected error occurred. Please try again.");
        //         console.log(err);
        //     } finally {
        //         setIsLoading(false);
        //     }
        // };

        // const handleOAuthSignIn = (provider) => {
        //     signIn(provider, {callbackUrl: "/"});
        // };

        return (
            <div 
                className="h-screen flex items-center justify-center bg-[url('/BG_xcoders.jpg')] bg-cover bg-center bg-no-repeat">
                <div className=" backdrop-blur-sm bg-linear-to-b from-['D69ADE'] to-white  w-1/3 rounded-2xl py-10 px-8 shadow-2xl border space-y-6">
                    <header className="flex justify-between">
                        <p className="mt-2 text-4xl text-black font-bold">Login</p>
                        <h1 className="mt-2 font-bold text-lg text-black">X-CODERS</h1>
                    </header>

                    {/* {error && <div className="text-sm text-red-400">{error}</div>} */}

                    <form className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-black">Username</label>
                            <input
                                className="w-full rounded-md text-black bg-gray-50 px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                                required
                                type="text"
                                placeholder="Enter your username"
                                // value={username}
                                // onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-black">Password</label>
                            <input
                                className="w-full rounded-md text-black bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                                required
                                type="password"
                                placeholder="Enter your password"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            
                            // disabled={isLoading}
                            className="w-full rounded-md bg-black px-3.5 py-1.5 text-center text-sm font-medium text-white cursor-pointer shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
                        >
                            {/* {isLoading ? "Signing in..." : "Sign In"} */}
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
                            href={href}
                            className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline cursor-pointer"
                        >
                            Register
                        </a>
                    </p>
                </div>
            </div>
        );
    }
;

export default Login;