require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Route imports
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

// ✅ Connect to MongoDB and start the server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // ✅ Mount all routes at root level
    app.use("/", authRoutes);     // /signup and /login
    app.use("/books", bookRoutes);
    app.use("/", reviewRoutes);   // /books/:id/reviews, /reviews/:id

    // ✅ Default 404 handler
    app.use((req, res) => {
      res.status(404).json({ message: "Route not found" });
    });

    // ✅ Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

startServer();
