import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    isSubcribed: Boolean,
    subscribedDate: { type: Date },
    trialEndDate: { type: Date },
    emailVerified: Boolean,
    paymentDetails: mongoose.Schema.Types.Mixed
});

export default mongoose.model("User", userSchema);