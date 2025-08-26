import mongoose from "mongoose";
import Store from "./models/Store.js";
import Item from "./models/Item.js";

const mongoURI = "mongodb+srv://qiratazam123:tD20zU7JXrpYde5y@shopsmart-cluster.scs7ktn.mongodb.net/shopsmart";

// Sample stores data
const stores = [
  {
    name: "Walmart",
    logo: "https://logo.clearbit.com/walmart.com",
    website: "https://walmart.com",
    type: "both",
    location: {
      address: "123 Main St",
      city: "New York",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    }
  },
  {
    name: "Target",
    logo: "https://logo.clearbit.com/target.com",
    website: "https://target.com",
    type: "both",
    location: {
      address: "456 Oak Ave",
      city: "Los Angeles",
      coordinates: { lat: 34.0522, lng: -118.2437 }
    }
  },
  {
    name: "Kroger",
    logo: "https://logo.clearbit.com/kroger.com",
    website: "https://kroger.com",
    type: "both",
    location: {
      address: "789 Pine St",
      city: "Chicago",
      coordinates: { lat: 41.8781, lng: -87.6298 }
    }
  },
  {
    name: "Amazon Fresh",
    logo: "https://logo.clearbit.com/amazon.com",
    website: "https://amazon.com/fresh",
    type: "online",
    location: {
      address: "Online Store",
      city: "Seattle",
      coordinates: { lat: 47.6062, lng: -122.3321 }
    }
  },
  {
    name: "Whole Foods",
    logo: "https://logo.clearbit.com/wholefoodsmarket.com",
    website: "https://wholefoodsmarket.com",
    type: "both",
    location: {
      address: "321 Market St",
      city: "San Francisco",
      coordinates: { lat: 37.7749, lng: -122.4194 }
    }
  }
];

// Sample items data
const items = [
  {
    name: "Organic Bananas",
    category: "Fruits",
    brand: "Organic Valley",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300",
    unit: "bunch",
    prices: [
      { store: null, currentPrice: 2.99, originalPrice: 3.49, discount: 0.50, inStock: true },
      { store: null, currentPrice: 3.49, originalPrice: 3.49, discount: 0, inStock: true },
      { store: null, currentPrice: 2.79, originalPrice: 2.99, discount: 0.20, inStock: true },
      { store: null, currentPrice: 3.99, originalPrice: 3.99, discount: 0, inStock: true },
      { store: null, currentPrice: 3.29, originalPrice: 3.29, discount: 0, inStock: true }
    ],
    tags: ["organic", "fruit", "healthy"]
  },
  {
    name: "Whole Milk",
    category: "Dairy",
    brand: "Horizon Organic",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300",
    unit: "gallon",
    prices: [
      { store: null, currentPrice: 4.99, originalPrice: 5.49, discount: 0.50, inStock: true },
      { store: null, currentPrice: 5.29, originalPrice: 5.29, discount: 0, inStock: true },
      { store: null, currentPrice: 4.79, originalPrice: 4.99, discount: 0.20, inStock: true },
      { store: null, currentPrice: 5.99, originalPrice: 5.99, discount: 0, inStock: true },
      { store: null, currentPrice: 5.49, originalPrice: 5.49, discount: 0, inStock: true }
    ],
    tags: ["dairy", "organic", "calcium"]
  },
  {
    name: "Chicken Breast",
    category: "Meat",
    brand: "Perdue",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300",
    unit: "lb",
    prices: [
      { store: null, currentPrice: 6.99, originalPrice: 7.99, discount: 1.00, inStock: true },
      { store: null, currentPrice: 7.49, originalPrice: 7.49, discount: 0, inStock: true },
      { store: null, currentPrice: 6.79, originalPrice: 6.99, discount: 0.20, inStock: true },
      { store: null, currentPrice: 8.49, originalPrice: 8.49, discount: 0, inStock: true },
      { store: null, currentPrice: 7.99, originalPrice: 7.99, discount: 0, inStock: true }
    ],
    tags: ["meat", "protein", "lean"]
  },
  {
    name: "Quinoa",
    category: "Grains",
    brand: "Ancient Harvest",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300",
    unit: "lb",
    prices: [
      { store: null, currentPrice: 8.99, originalPrice: 9.99, discount: 1.00, inStock: true },
      { store: null, currentPrice: 9.49, originalPrice: 9.49, discount: 0, inStock: true },
      { store: null, currentPrice: 8.79, originalPrice: 8.99, discount: 0.20, inStock: true },
      { store: null, currentPrice: 10.99, originalPrice: 10.99, discount: 0, inStock: true },
      { store: null, currentPrice: 9.99, originalPrice: 9.99, discount: 0, inStock: true }
    ],
    tags: ["grain", "protein", "gluten-free"]
  },
  {
    name: "Avocados",
    category: "Vegetables",
    brand: "Hass",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300",
    unit: "each",
    prices: [
      { store: null, currentPrice: 1.99, originalPrice: 2.49, discount: 0.50, inStock: true },
      { store: null, currentPrice: 2.29, originalPrice: 2.29, discount: 0, inStock: true },
      { store: null, currentPrice: 1.79, originalPrice: 1.99, discount: 0.20, inStock: true },
      { store: null, currentPrice: 2.99, originalPrice: 2.99, discount: 0, inStock: true },
      { store: null, currentPrice: 2.49, originalPrice: 2.49, discount: 0, inStock: true }
    ],
    tags: ["vegetable", "healthy", "fats"]
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Store.deleteMany({});
    await Item.deleteMany({});
    console.log("🗑️ Cleared existing data");

    // Insert stores
    const createdStores = await Store.insertMany(stores);
    console.log(`✅ Created ${createdStores.length} stores`);

    // Update items with store references
    const updatedItems = items.map((item, index) => {
      const itemPrices = item.prices.map((price, priceIndex) => ({
        ...price,
        store: createdStores[priceIndex % createdStores.length]._id
      }));

      // Calculate derived fields
      const prices = itemPrices.map(p => p.currentPrice);
      const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
      const lowestPrice = Math.min(...prices);
      const highestPrice = Math.max(...prices);
      const dealScore = itemPrices.reduce((score, price) => {
        if (price.discount > 0) score += price.discount * 10;
        return score;
      }, 0);
      const isOnSale = itemPrices.some(p => p.discount > 0);

      return {
        ...item,
        prices: itemPrices,
        averagePrice,
        lowestPrice,
        highestPrice,
        dealScore,
        isOnSale
      };
    });

    // Insert items
    const createdItems = await Item.insertMany(updatedItems);
    console.log(`✅ Created ${createdItems.length} items`);

    console.log("🎉 Database seeded successfully!");
    console.log(`📊 Total stores: ${createdStores.length}`);
    console.log(`📊 Total items: ${createdItems.length}`);

    // Display sample data
    console.log("\n📋 Sample stores:");
    createdStores.forEach(store => {
      console.log(`  - ${store.name} (${store.type})`);
    });

    console.log("\n📋 Sample items:");
    createdItems.forEach(item => {
      console.log(`  - ${item.name} - $${item.lowestPrice} to $${item.highestPrice}`);
    });

  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

// Run the seeding function
seedDatabase();
