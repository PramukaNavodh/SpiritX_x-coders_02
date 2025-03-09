import connectDB from "@/lib/db";
import Player from "@/models/Player";
import {calculatePoints, calculateValue} from "@/lib/points";

export async function GET() {
    await connectDB();
    const players = await Player.find();
    const enrichedPlayers = players.map(player => {
        const points = calculatePoints(player);
        const value = calculateValue(points);
        return {...player._doc, value}; // Points hidden
    });
    return new Response(JSON.stringify(enrichedPlayers), {status: 200});
}