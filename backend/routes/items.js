// backend/routes/items.js
import express from "express";
import Item from "../models/Item.js";   // 👈 make sure path is correct

const router = express.Router();

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST new item
router.post("/", async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
