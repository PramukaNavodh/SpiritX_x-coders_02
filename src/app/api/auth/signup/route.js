import connectDB from "@/lib/db";
import {cookies} from "next/headers";
import {hashPassword, signToken} from "@/lib/auth";
import User from "@/models/User";

export async function POST(req) {
    await connectDB();
    const {username, password} = await req.json();
    if (!username || !password) return new Response(JSON.stringify({error: "All fields required"}), {status: 400});

    const existingUser = await User.findOne({username});
    if (existingUser) return new Response(JSON.stringify({error: "Username taken"}), {status: 400});

    const hashedPassword = await hashPassword(password);
    const user = await User.create({username, password: hashedPassword});
    const token = signToken(user);

    cookies().set("token", token, {httpOnly: true, sameSite: "strict", maxAge: 24 * 60 * 60});
    return new Response(JSON.stringify({token}), {status: 201});
}