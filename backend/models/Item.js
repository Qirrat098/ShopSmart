// backend/models/Item.js
import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  store: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Item", ItemSchema);
