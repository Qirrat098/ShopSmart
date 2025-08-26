// backend/routes/items.js
import express from "express";
import Item from "../models/Item.js";
import Store from "../models/Store.js";

const router = express.Router();

// GET all items with pagination and search
router.get("/", async (req, res) => {
  try {
    const { 
      search, 
      category, 
      store, 
      minPrice, 
      maxPrice, 
      sortBy = 'name',
      page = 1,
      limit = 20
    } = req.query;

    let query = {};

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Store filter
    if (store) {
      query['prices.store'] = store;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.averagePrice = {};
      if (minPrice) query.averagePrice.$gte = parseFloat(minPrice);
      if (maxPrice) query.averagePrice.$lte = parseFloat(maxPrice);
    }

    // Sorting options
    let sortOptions = {};
    switch (sortBy) {
      case 'price_low':
        sortOptions.averagePrice = 1;
        break;
      case 'price_high':
        sortOptions.averagePrice = -1;
        break;
      case 'deal_score':
        sortOptions.dealScore = -1;
        break;
      case 'newest':
        sortOptions.createdAt = -1;
        break;
      default:
        sortOptions.name = 1;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const items = await Item.find(query)
      .populate('prices.store')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Item.countDocuments(query);

    res.json({
      items,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET item by ID with full details
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('prices.store')
      .populate('priceHistory.store');
    
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST new item
router.post("/", async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT update item
router.put("/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE item
router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET deals (items with discounts)
router.get("/deals/featured", async (req, res) => {
  try {
    const deals = await Item.find({ 
      isOnSale: true,
      'prices.discount': { $gt: 0 }
    })
    .populate('prices.store')
    .sort({ dealScore: -1 })
    .limit(10);
    
    res.json(deals);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET price comparison for specific item
router.get("/:id/compare", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('prices.store');
    
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    
    // Sort prices by current price
    const sortedPrices = item.prices.sort((a, b) => a.currentPrice - b.currentPrice);
    
    res.json({
      item: {
        id: item._id,
        name: item.name,
        category: item.category,
        brand: item.brand,
        image: item.image
      },
      prices: sortedPrices,
      cheapest: sortedPrices[0],
      averagePrice: item.averagePrice
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
