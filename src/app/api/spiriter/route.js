import {querySpiriter} from "@/lib/spiriter";

export async function POST(req) {
    try {
        const {query} = await req.json();
        if (!query) return new Response(JSON.stringify({error: "Query required"}), {status: 400});
        const response = await querySpiriter(query);
        return new Response(JSON.stringify({response}), {status: 200});
    } catch (error) {
        console.error("Spiriter error:", error);
        return new Response(JSON.stringify({error: "Internal server error"}), {status: 500});
    }
}