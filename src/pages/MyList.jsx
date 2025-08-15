// src/pages/Deals.jsx
import { motion } from 'framer-motion';

function MyList() {
  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Best Deals</h1>
        <div className="card">
          <p className="text-center">Amazing deals coming soon! 🏷️</p>
        </div>
      </motion.div>
    </div>
  );
}

export default MyList;