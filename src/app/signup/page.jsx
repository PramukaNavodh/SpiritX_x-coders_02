"use client";

import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import axiosInstance from "@/util/axiosInstance";

const SignUp = ({ href, role }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Proceed with signup logic here
    console.log("Sign Up Successful!");
  };
  // const [email, setEmail] = useState("");

  //   const [verificationCode, setVerificationCode] = useState("");

  //   const [step, setStep] = useState("start");
  //   const [isLoading, setIsLoading] = useState(false);
  //   const router = useRouter();

  //   const handleSignup = async (e) => {
  //     e.preventDefault();
  //     setIsLoading(true);
  //     setError("");

  //     if (password !== confirmPassword) {
  //       setError("Passwords do not match");
  //       setIsLoading(false);
  //       return;
  //     }

  //     try {
  //       const res = await axiosInstance.post("/auth/register", {
  //         email,
  //         password,
  //         role,
  //       });
  //       console.log(email, password, role);

  //       if (res.status === 201) {
  //         setStep("verification");
  //       }
  //     } catch (err) {
  //       setError(
  //         err.response?.data?.message || "Registration failed. Please try again."
  //       );
  //       console.log(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   const handleVerification = async (e) => {
  //     e.preventDefault();
  //     setIsLoading(true);
  //     setError("");

  //     try {
  //       const res = await axiosInstance.post("/auth/verify", {
  //         email,
  //         code: verificationCode,
  //       });

  //       if (res.status === 200) {
  //         const result = await signIn("credentials", {
  //           email,
  //           password,
  //           redirect: false,
  //         });

  //         if (result.error) {
  //           setError(result.error);
  //         } else {
  //           router.push("/");
  //           router.refresh();
  //         }
  //       }
  //     } catch (err) {
  //       setError(
  //         err.response?.data?.message || "Verification failed. Please try again."
  //       );
  //       console.log(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   const handleOAuthSignIn = (provider) => {
  //     signIn(provider, { callbackUrl: "/" });
  //   };

  return (
    <div className="h-screen flex items-center justify-center bg-[url('/BG_xcoders.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="backdrop-blur-sm bg-linear-to-b to-white w-1/3 space-y-6 rounded-2xl px-4 py-10 shadow-md ring-1 ring-black/5 sm:px-8">
        <header className="flex justify-center">
          <h1 className="mt-2 text-4xl text-black font-bold">Sign Up</h1>
        </header>
        {/* {error && <div className="block text-sm text-red-400">{error}</div>} */}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-black">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              required
              // value={username}
              // onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md text-black bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium  text-black">Password</label>
            <input
              type="password"
              required
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md  text-black bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium  text-black">
              Confirm Password
            </label>
            <input
              type="password"
              required
              placeholder="Re-Enter the Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md  text-black bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
            />
          </div>
          {/* {error && (
            <div className="text-sm text-red-500 text-center">{error}</div>
          )} */}
          <button
            type="submit"
            //   disabled={isLoading}
            className="w-full rounded-md bg-black px-3.5 py-1.5 text-center text-sm font-medium text-white cursor-pointer shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
          >
            {/* {isLoading ? "Signing Up..." : "Sign Up"} */}
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
            href={href}
            className="font-medium  text-black decoration-zinc-950/20 cursor-pointer underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;