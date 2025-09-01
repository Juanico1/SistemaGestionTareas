import mongoose from "mongoose";

export const connectDB = async () => {
    const uri = process.env.MONGO_URI as string;
    if (!uri) throw new Error("MONGO_URI not defined in .env");

    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(uri);
        console.log("Database connected");
    } catch (err) {
        console.error("Database connection error:", err);
        throw err;
    }
};
