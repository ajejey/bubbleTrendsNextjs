import mongoose from "mongoose";

const trendSchema = new mongoose.Schema({
    updated: { type: Date, default: Date.now },
    trend: String,
    results: String
});

export default mongoose.model("Trend", trendSchema);