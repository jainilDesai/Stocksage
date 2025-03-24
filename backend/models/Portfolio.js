const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  stocks: [
    {
      ticker: String,
      quantity: Number,
      avgPrice: Number,
    },
  ],
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
