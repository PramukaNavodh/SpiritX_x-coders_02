import {GoogleGenerativeAI} from "@google/generative-ai";
import connectDB from "@/lib/db";
import Player from "@/models/Player"
import {calculatePoints, calculateValue} from "@/lib/points";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const querySpiriter = async (prompt) => {
    await connectDB();
    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

    const players = await Player.find();
    const playerData = players.map(p => ({
        name: p.name,
        university: p.university,
        category: p.category,
        totalRuns: p.totalRuns,
        ballsFaced: p.ballsFaced,
        inningsPlayed: p.inningsPlayed,
        wickets: p.wickets,
        oversBowled: p.oversBowled,
        runsConceded: p.runsConceded,
        value: calculateValue(calculatePoints(p)),
    }));

    const fullPrompt = `
    You are Spiriter, a fantasy cricket chatbot for Spirit11. Use only this player data:
    ${JSON.stringify(playerData, null, 2)}
    
    Rules:
    - Never reveal player points.
    - For player queries, respond with name, university, runs, wickets, etc.
    - For "suggest team," select 11 players with highest value within 9,000,000 budget, list names only.
    - For unavailable data, reply: "I don’t have enough knowledge to answer that question."
    
    Query: "${prompt}"
  `;

    const result = await model.generateContent(fullPrompt);
    return result.response.text().trim();
}