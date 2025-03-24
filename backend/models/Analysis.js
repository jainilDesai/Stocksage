const mongoose = require("mongoose");

const AnalysisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  insights: String, // AI-generated insights
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Analysis", AnalysisSchema);
