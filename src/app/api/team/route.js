import connectDB from "@/lib/db";
import User from "@/models/User";
import Player from "@/models/Player";
import {verifyToken} from "@/lib/auth";
import {calculatePoints, calculateValue} from "@/lib/points";
import {cookies} from "next/headers";
import {getIO} from "@/lib/socket";

export async function GET() {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return new Response("Unauthorized", {status: 401});
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).populate("team");
    if (!user) return new Response("Unauthorized", {status: 401});

    const totalPoints = user.team.length === 11 ? user.team.reduce((sum, p) => sum + calculatePoints(p), 0) : 0;
    user.points = totalPoints;
    await user.save();
    return new Response(JSON.stringify({
        team: user.team.map(p => ({
            ...p._doc,
            value: calculateValue(calculatePoints(p))
        })), totalPoints
    }), {status: 200});
}

export async function POST(req) {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = verifyToken(token);
    const {playerId} = await req.json();
    const user = await User.findById(decoded.id).populate("team");
    const player = await Player.findById(playerId);

    if (user.team.length >= 11) return new Response("Team already has 11 players", {status: 400});
    if (user.team.some(p => p._id.toString() === playerId)) return new Response("Player already in team", {status: 400});
    const newBudget = user.budget - calculateValue(calculatePoints(player));
    if (newBudget < 0) return new Response("Insufficient budget", {status: 400});

    user.team.push(playerId);
    user.budget = newBudget;
    await user.save();
    getIO().emit("teamUpdate", {userId: user._id});
    return new Response("Player added", {status: 200});
}

export async function DELETE(req) {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = verifyToken(token);
    const {playerId} = await req.json();
    const user = await User.findById(decoded.id).populate("team");
    const player = await Player.findById(playerId);

    user.team = user.team.filter(p => p._id.toString() !== playerId);
    user.budget += calculateValue(calculatePoints(player));
    await user.save();
    getIO().emit("teamUpdate", {userId: user._id});
    return new Response("Player removed", {status: 200});
}