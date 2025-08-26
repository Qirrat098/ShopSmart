import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  logo: String,
  website: String,
  type: {
    type: String,
    enum: ['online', 'offline', 'both'],
    default: 'both'
  },
  location: {
    address: String,
    city: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model("Store", storeSchema);
