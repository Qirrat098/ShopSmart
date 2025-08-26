import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Item from "./models/Item.js";
import Store from "./models/Store.js";
import User from "./models/User.js";
import itemsRouter from "./routes/items.js";
import storesRouter from "./routes/stores.js";
import usersRouter from "./routes/users.js";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = "mongodb+srv://qiratazam123:tD20zU7JXrpYde5y@shopsmart-cluster.scs7ktn.mongodb.net/shopsmart";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/items", itemsRouter);
app.use("/api/stores", storesRouter);
app.use("/api/users", usersRouter);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "ShopSmart Backend Running 🚀",
    status: "healthy",
    timestamp: new Date().toISOString(),
    endpoints: {
      items: "/api/items",
      stores: "/api/stores",
      users: "/api/users"
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 API Documentation: http://localhost:${PORT}`);
});
