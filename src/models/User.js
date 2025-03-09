import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    team: [{type: mongoose.Schema.Types.ObjectId, ref: "Player"}],
    budget: {type: Number, default: 9000000},
    points: {type: Number, default: 0},
    isAdmin: {type: Boolean, default: false},
});

export default mongoose.models.User || mongoose.model("User", UserSchema);