import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    university: {type: String, required: true},
    category: {type: String, enum: ["Batsman", "All-Rounder", "Bowler"], required: true},
    totalRuns: {type: Number, default: 0},
    ballsFaced: {type: Number, default: 0},
    inningsPlayed: {type: Number, default: 0},
    wickets: {type: Number, default: 0},
    oversBowled: {type: Number, default: 0},
    runsConceded: {type: Number, default: 0},
    isOriginal: {type: Boolean, default: true},
});

export default mongoose.models.Player || mongoose.model("Player", PlayerSchema);