import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET() {
    await connectDB();
    const users = await User.find({"team.10": {$exists: true}}).sort({points: -1});
    return new Response(JSON.stringify(users), {status: 200});
}