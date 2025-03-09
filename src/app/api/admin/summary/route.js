import connectDB from "@/lib/db";
import Player from "@/models/Player";
import User from "@/models/User";
import {verifyToken} from "@/lib/auth";
import {cookies} from "next/headers";

export async function GET() {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user.isAdmin) return new Response("Unauthorized", {status: 403});

    const summary = await Player.aggregate([
        {$group: {_id: null, totalRuns: {$sum: "$totalRuns"}, totalWickets: {$sum: "$wickets"}}},
        {$lookup: {from: "players", pipeline: [{$sort: {totalRuns: -1}}, {$limit: 1}], as: "highestRunScorer"}},
        {$lookup: {from: "players", pipeline: [{$sort: {wickets: -1}}, {$limit: 1}], as: "highestWicketTaker"}},
    ]);

    return new Response(JSON.stringify({
        totalRuns: summary[0].totalRuns,
        totalWickets: summary[0].totalWickets,
        highestRunScorer: summary[0].highestRunScorer[0].name,
        highestWicketTaker: summary[0].highestWicketTaker[0].name,
    }), {status: 200});
}