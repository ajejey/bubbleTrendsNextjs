import mongoose from "mongoose";

const trendSchema = new mongoose.Schema({
    updated: { type: Date, default: Date.now },
    trend: String,
    language: String,
    results: Number
});

export default mongoose.models.MoreTrend || mongoose.model("MoreTrend", trendSchema);