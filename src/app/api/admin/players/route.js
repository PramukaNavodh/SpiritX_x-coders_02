import connectDB from "@/lib/db";
import Player from "@/models/Player";
import User from "@/models/User";
import {verifyToken} from "@/lib/auth";
import {calculatePoints, calculateValue} from "@/lib/points";
import {cookies} from "next/headers";
import {getIO} from "@/lib/socket";

export async function GET() {
    await connectDB();
    const token = cookies().get("token")?.value;
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user.isAdmin) return new Response("Unauthorized", {status: 403});

    const players = await Player.find();
    const enrichedPlayers = players.map(p => ({
        ...p._doc,
        points: calculatePoints(p),
        value: calculateValue(calculatePoints(p)),
    }));
    return new Response(JSON.stringify(enrichedPlayers), {status: 200});
}

export async function POST(req) {
    await connectDB();
    const token = cookies().get("token")?.value;
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user.isAdmin) return new Response("Unauthorized", {status: 403});

    const data = await req.json();
    const player = await Player.create({...data, isOriginal: false});
    const points = calculatePoints(player);
    const value = calculateValue(points);
    getIO().emit("playerUpdate", {...player._doc, points, value});
    return new Response(JSON.stringify({...player._doc, points, value}), {status: 201});
}

export async function PUT(req) {
    await connectDB();
    const token = cookies().get("token")?.value;
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user.isAdmin) return new Response("Unauthorized", {status: 403});

    const {id, ...data} = await req.json();
    const player = await Player.findById(id);
    if (player.isOriginal) return new Response("Cannot modify original players", {status: 403});

    Object.assign(player, data);
    await player.save();
    const points = calculatePoints(player);
    const value = calculateValue(points);
    getIO().emit("playerUpdate", {...player._doc, points, value});
    return new Response(JSON.stringify({...player._doc, points, value}), {status: 200});
}

export async function DELETE(req) {
    await connectDB();
    const token = cookies().get("token")?.value;
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user.isAdmin) return new Response("Unauthorized", {status: 403});

    const {id} = await req.json();
    const player = await Player.findById(id);
    if (player.isOriginal) return new Response("Cannot delete original players", {status: 403});

    await Player.deleteOne({_id: id});
    getIO().emit("playerUpdate", {id, deleted: true});
    return new Response("Player deleted", {status: 200});
}