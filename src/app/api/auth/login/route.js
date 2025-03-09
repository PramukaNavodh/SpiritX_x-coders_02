import {cookies} from "next/headers";
import {comparePassword, signToken} from "@/lib/auth";
import User from "@/models/User";
import connectDB from "@/lib/db";

export async function POST(req) {
    await connectDB();
    const {username, password} = await req.json();
    if (!username || !password) return new Response(JSON.stringify({error: "All fields required"}), {status: 400});

    const user = await User.findOne({username});
    if (!user || !(await comparePassword(password, user.password))) {
        return new Response(JSON.stringify({error: "Invalid credentials"}), {status: 401});
    }

    const token = signToken(user);
    cookies().set("token", token, {httpOnly: true, sameSite: "strict", maxAge: 24 * 60 * 60});
    return new Response(JSON.stringify({token}), {status: 200});
}