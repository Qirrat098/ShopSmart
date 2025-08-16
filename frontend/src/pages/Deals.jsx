// src/pages/Deals.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Deals() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    // fetch data from backend
    fetch("http://localhost:8000/api/items") // 👈 your backend API
      .then((res) => res.json())
      .then((data) => setDeals(data))
      .catch((err) => console.error("Error fetching deals:", err));
  }, []);

  return (
    <div className="page-container p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Best Deals 🏷️</h1>

        {deals.length === 0 ? (
          <p className="text-center">No deals yet. Add some items!</p>
        ) : (
          <div className="grid gap-4">
            {deals.map((item) => (
              <motion.div
                key={item._id}
                className="border rounded-lg p-4 shadow"
                whileHover={{ scale: 1.05 }}
              >
                <h2 className="font-bold">{item.name}</h2>
                <p>Price: Rs.{item.price}</p>
                <p className="text-sm text-gray-500">Store: {item.store}</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Deals;
