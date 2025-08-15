// src/pages/Search.jsx
import { motion } from 'framer-motion';

function Search() {
  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Search Products</h1>
        <div className="card">
          <p className="text-center">Search functionality coming soon! 🔍</p>
        </div>
      </motion.div>
    </div>
  );
}

// src/pages/Deals.jsx
export function Deals() {
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

// src/pages/MyList.jsx
export function MyList() {
  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center mb-6">My Shopping List</h1>
        <div className="card">
          <p className="text-center">Your shopping list will appear here! 📋</p>
        </div>
      </motion.div>
    </div>
  );
}

// src/pages/Profile.jsx
export function Profile() {
  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Profile</h1>
        <div className="card">
          <p className="text-center">Profile settings coming soon! 👤</p>
        </div>
      </motion.div>
    </div>
  );
}

// src/pages/Login.jsx
export function Login() {
  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <p className="text-center">Authentication coming soon! 🔐</p>
        </div>
      </motion.div>
    </div>
  );
}

export default Search;