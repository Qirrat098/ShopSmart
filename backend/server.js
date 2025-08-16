import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Item from "./models/Item.js"; // ✅ import the model


const app = express();
app.use(cors());
app.use(express.json());

// ✅ Correct connection string
const mongoURI = "mongodb+srv://qiratazam123:tD20zU7JXrpYde5y@shopsmart-cluster.scs7ktn.mongodb.net/shopsmart";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("ShopSmart Backend Running 🚀");
});

app.listen(8000, () => {
  console.log("✅ Server running on http://localhost:8000");
});

// Test Route
app.get("/", (req, res) => {
  res.send("ShopSmart Backend Running 🚀");
});

// Add grocery item
app.post("/api/items", async (req, res) => {
  try {
    const { name, price, store } = req.body;
    const newItem = new Item({ name, price, store });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all items
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
