import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error('MONGODB_URI is not defined');

let cached = global.mongoose;
if (!cached) cached = global.mongoose = {conn: null, promise: null};

const connectDB = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;

