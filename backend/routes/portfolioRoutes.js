const express = require("express");
const Portfolio = require("../models/Portfolio");

const router = express.Router();

// POST: Store user's stock holdings
router.post("/", async (req, res) => {
  try {
    const { userId, stocks } = req.body;
    const portfolio = new Portfolio({ userId, stocks });
    await portfolio.save();
    res.status(201).json({ message: "Portfolio saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving portfolio" });
  }
});

// GET: Fetch user's portfolio
router.get("/:userId", async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.params.userId });
    if (!portfolio)
      return res.status(404).json({ message: "Portfolio not found" });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: "Error fetching portfolio" });
  }
});

module.exports = router;
