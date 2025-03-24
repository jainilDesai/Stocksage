const express = require("express");
const Analysis = require("../models/Analysis");

const router = express.Router();

// GET: Fetch AI-generated insights
router.get("/:userId", async (req, res) => {
  try {
    const analysis = await Analysis.findOne({ userId: req.params.userId }).sort(
      { createdAt: -1 }
    );
    if (!analysis)
      return res.status(404).json({ message: "No analysis found" });
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: "Error fetching analysis" });
  }
});

module.exports = router;
