import connectDB from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id);
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }
        return new Response(JSON.stringify({ budget: user.budget }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }
}