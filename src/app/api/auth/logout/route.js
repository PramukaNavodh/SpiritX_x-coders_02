import {cookies} from "next/headers";

export async function POST() {
    cookies().delete("token");
    return new Response(JSON.stringify({message: "Logged out"}), {status: 200});
}