// backend/models/Item.js
import mongoose from "mongoose";

const priceHistorySchema = new mongoose.Schema({
  price: Number,
  date: {
    type: Date,
    default: Date.now
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  }
});

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  category: {
    type: String,
    default: 'General'
  },
  brand: String,
  image: String,
  description: String,
  unit: {
    type: String,
    default: 'piece'
  },
  prices: [{
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true
    },
    currentPrice: {
      type: Number,
      required: true
    },
    originalPrice: Number,
    discount: Number,
    lastUpdated: {
      type: Date,
      default: Date.now
    },
    inStock: {
      type: Boolean,
      default: true
    }
  }],
  priceHistory: [priceHistorySchema],
  averagePrice: Number,
  lowestPrice: Number,
  highestPrice: Number,
  dealScore: {
    type: Number,
    default: 0
  },
  isOnSale: {
    type: Boolean,
    default: false
  },
  tags: [String]
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for cheapest price
itemSchema.virtual('cheapestPrice').get(function() {
  if (!this.prices || this.prices.length === 0) return null;
  return Math.min(...this.prices.map(p => p.currentPrice));
});

// Virtual for cheapest store
itemSchema.virtual('cheapestStore').get(function() {
  if (!this.prices || this.prices.length === 0) return null;
  const cheapest = this.prices.reduce((min, p) => 
    p.currentPrice < min.currentPrice ? p : min
  );
  return cheapest.store;
});

// Index for search optimization
itemSchema.index({ name: 'text', category: 'text', brand: 'text' });

export default mongoose.model("Item", itemSchema);

