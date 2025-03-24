// server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const portfolioRoutes = require("./routes/portfolioRoutes");
const analysisRoutes = require("./routes/analysisRoutes");
const geminiChatRoute = require("./routes/geminiChat");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/portfolio", portfolioRoutes);
app.use("/analysis", analysisRoutes);
app.use("/gemini", geminiChatRoute);

// // Debug: log registered routes
// console.log("✅ Registered Routes:");
// app._router.stack.forEach((layer) => {
//   if (layer.route) {
//     console.log(layer.route.path);
//   } else if (layer.name === "router") {
//     layer.handle.stack.forEach((subLayer) => {
//       if (subLayer.route) {
//         console.log(subLayer.route.path);
//       }
//     });
//   }
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
