import {cookies} from "next/headers";
import {verifyToken} from "@/lib/auth";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return new Response(JSON.stringify({error: "Not authenticated"}), {status: 401});

    try {
        const decoded = verifyToken(token);
        return new Response(JSON.stringify({username: decoded.username, isAdmin: decoded.isAdmin}), {status: 200});
    } catch {
        return new Response(JSON.stringify({error: "Invalid token"}), {status: 401});
    }
}