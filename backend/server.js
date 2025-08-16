import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Correct connection string
const mongoURI = "mongodb+srv://qiratazam123:tD20zU7JXrpYde5y@shopsmart-cluster.scs7ktn.mongodb.net/shopsmart";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("ShopSmart Backend Running 🚀");
});

app.listen(8000, () => {
  console.log("✅ Server running on http://localhost:8000");
});
