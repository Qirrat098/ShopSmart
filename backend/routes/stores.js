import express from "express";
import Store from "../models/Store.js";

const router = express.Router();

// GET all stores
router.get("/", async (req, res) => {
  try {
    const stores = await Store.find({ isActive: true }).sort({ name: 1 });
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET store by ID
router.get("/:id", async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    
    res.json(store);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST new store
router.post("/", async (req, res) => {
  try {
    const store = new Store(req.body);
    await store.save();
    res.status(201).json(store);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT update store
router.put("/:id", async (req, res) => {
  try {
    const store = await Store.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    
    res.json(store);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE store (soft delete)
router.delete("/:id", async (req, res) => {
  try {
    const store = await Store.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    
    res.json({ message: "Store deactivated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
