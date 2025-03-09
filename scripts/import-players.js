import mongoose from "mongoose";
import fs from "fs";
import {parse} from "csv-parse";
import Player from "../src/models/Player.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://kaveesha:kaveesha123@learnmongo.le3guvg.mongodb.net/spirit11?retryWrites=true&w=majority&appName=LearnMongo";

if (!MONGO_URI) {
    throw new Error("MONGODB_URI not defined");
}

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

async function importPlayers() {
    try {
        await Player.deleteMany({});
        console.log("Cleared existing players");

        const players = [];

        fs.createReadStream("./scripts/sample_data.csv")
            .pipe(parse({columns: true, trim: true}))
            .on("data", (row) => {
                players.push({
                    name: row["Name"],
                    university: row["University"],
                    category: row["Category"],
                    totalRuns: parseInt(row["Total Runs"]) || 0,
                    ballsFaced: parseInt(row["Balls Faced"]) || 0,
                    inningsPlayed: parseInt(row["Innings Played"]) || 0,
                    wickets: parseInt(row["Wickets"]) || 0,
                    oversBowled: parseFloat(row["Overs Bowled"]) || 0,
                    runsConceded: parseInt(row["Runs Conceded"]) || 0,
                    isOriginal: true,
                });
            })
            .on("end", async () => {
                await Player.insertMany(players);
                console.log(`Imported ${players.length} players successfully!`);
                mongoose.connection.close();
            })
            .on("error", (error) => {
                console.error("Error parsing CSV:", error);
                mongoose.connection.close();
            });
    } catch (error) {
        console.error("Error importing players:", error);
        mongoose.connection.close();
    }
}

importPlayers();