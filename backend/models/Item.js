// backend/models/Item.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  store: String,
}, { timestamps: true });

export default mongoose.model("Item", itemSchema);

