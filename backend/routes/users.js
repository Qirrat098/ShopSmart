import express from "express";
import User from "../models/User.js";
import Item from "../models/Item.js";

const router = express.Router();

// GET user profile
router.get("/:firebaseUid", async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid })
      .populate('preferences.favoriteStores')
      .populate('favoriteItems')
      .populate('shoppingLists.items.item')
      .populate('dealAlerts.item');
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST create/update user
router.post("/", async (req, res) => {
  try {
    const { firebaseUid, email, displayName, photoURL } = req.body;
    
    let user = await User.findOne({ firebaseUid });
    
    if (user) {
      // Update existing user
      user.email = email;
      user.displayName = displayName;
      user.photoURL = photoURL;
      user.lastActive = new Date();
    } else {
      // Create new user
      user = new User({
        firebaseUid,
        email,
        displayName,
        photoURL,
        shoppingLists: [{ name: 'My Shopping List', items: [] }]
      });
    }
    
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT update user preferences
router.put("/:firebaseUid/preferences", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { firebaseUid: req.params.firebaseUid },
      { 
        preferences: req.body,
        lastActive: new Date()
      },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST add item to shopping list
router.post("/:firebaseUid/shopping-list", async (req, res) => {
  try {
    const { itemId, quantity = 1, priority = 'medium', listName = 'My Shopping List' } = req.body;
    
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    let shoppingList = user.shoppingLists.find(list => list.name === listName);
    if (!shoppingList) {
      shoppingList = { name: listName, items: [] };
      user.shoppingLists.push(shoppingList);
    }
    
    // Check if item already exists in the list
    const existingItemIndex = shoppingList.items.findIndex(
      listItem => listItem.item.toString() === itemId
    );
    
    if (existingItemIndex >= 0) {
      // Update quantity
      shoppingList.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      shoppingList.items.push({
        item: itemId,
        quantity,
        priority
      });
    }
    
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT update shopping list item
router.put("/:firebaseUid/shopping-list/:itemId", async (req, res) => {
  try {
    const { quantity, priority, isCompleted, listName = 'My Shopping List' } = req.body;
    
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const shoppingList = user.shoppingLists.find(list => list.name === listName);
    if (!shoppingList) {
      return res.status(404).json({ error: "Shopping list not found" });
    }
    
    const listItem = shoppingList.items.find(
      item => item.item.toString() === req.params.itemId
    );
    
    if (!listItem) {
      return res.status(404).json({ error: "Item not found in shopping list" });
    }
    
    if (quantity !== undefined) listItem.quantity = quantity;
    if (priority !== undefined) listItem.priority = priority;
    if (isCompleted !== undefined) listItem.isCompleted = isCompleted;
    
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE remove item from shopping list
router.delete("/:firebaseUid/shopping-list/:itemId", async (req, res) => {
  try {
    const { listName = 'My Shopping List' } = req.query;
    
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const shoppingList = user.shoppingLists.find(list => list.name === listName);
    if (!shoppingList) {
      return res.status(404).json({ error: "Shopping list not found" });
    }
    
    shoppingList.items = shoppingList.items.filter(
      item => item.item.toString() !== req.params.itemId
    );
    
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST add deal alert
router.post("/:firebaseUid/deal-alerts", async (req, res) => {
  try {
    const { itemId, targetPrice } = req.body;
    
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Check if alert already exists
    const existingAlert = user.dealAlerts.find(
      alert => alert.item.toString() === itemId
    );
    
    if (existingAlert) {
      existingAlert.targetPrice = targetPrice;
      existingAlert.isActive = true;
    } else {
      user.dealAlerts.push({
        item: itemId,
        targetPrice
      });
    }
    
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT toggle deal alert
router.put("/:firebaseUid/deal-alerts/:itemId", async (req, res) => {
  try {
    const { isActive } = req.body;
    
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const alert = user.dealAlerts.find(
      a => a.item.toString() === req.params.itemId
    );
    
    if (!alert) {
      return res.status(404).json({ error: "Deal alert not found" });
    }
    
    alert.isActive = isActive;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST toggle favorite item
router.post("/:firebaseUid/favorites/:itemId", async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const itemIndex = user.favoriteItems.findIndex(
      item => item.toString() === req.params.itemId
    );
    
    if (itemIndex >= 0) {
      // Remove from favorites
      user.favoriteItems.splice(itemIndex, 1);
    } else {
      // Add to favorites
      user.favoriteItems.push(req.params.itemId);
    }
    
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
