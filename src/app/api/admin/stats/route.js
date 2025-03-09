import connectDB from "@/lib/db";
import Player from "@/models/Player";
import User from "@/models/User";
import {verifyToken} from "@/lib/auth";
import {calculatePoints, calculateValue} from "@/lib/points";
import {cookies} from "next/headers";

export async function GET(req) {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user.isAdmin) return new Response("Unauthorized", {status: 403});

    const players = await Player.find();
    const enrichedPlayers = players.map(p => ({
        ...p._doc,
        value: calculateValue(calculatePoints(p)),
    }));
    return new Response(JSON.stringify(enrichedPlayers), {status: 200});
}