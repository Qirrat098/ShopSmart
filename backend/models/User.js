import mongoose from "mongoose";

const shoppingListItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
});

const dealAlertSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  targetPrice: Number,
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  displayName: String,
  photoURL: String,
  preferences: {
    favoriteStores: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store'
    }],
    categories: [String],
    maxPriceRange: Number,
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      }
    }
  },
  shoppingLists: [{
    name: {
      type: String,
      default: 'My Shopping List'
    },
    items: [shoppingListItemSchema],
    createdAt: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  dealAlerts: [dealAlertSchema],
  favoriteItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }],
  lastActive: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
