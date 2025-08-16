// src/pages/Home.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, TagIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

function Home() {
  const features = [
    {
      icon: MagnifyingGlassIcon,
      title: "Smart Search",
      description: "Find the best prices across multiple stores instantly",
      color: "#2E8B57"
    },
    {
      icon: TagIcon,
      title: "Best Deals",
      description: "Get notified about the latest discounts and offers",
      color: "#FFD700"
    },
    {
      icon: ShoppingCartIcon,
      title: "Shopping Lists",
      description: "Create lists and find the cheapest store combination",
      color: "#2E8B57"
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#2E8B57', marginBottom: '1rem' }}>
          🛒 ShopSmart
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#666', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Compare grocery prices across multiple stores and never overpay again. 
          Find the best deals and save money on every shopping trip.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/search" className="btn btn-primary">
            Start Searching
          </Link>
          <Link to="/deals" className="btn btn-deal">
            View Deals
          </Link>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        className="grid-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="card text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <feature.icon 
              style={{ 
                width: '48px', 
                height: '48px', 
                color: feature.color, 
                margin: '0 auto 1rem' 
              }} 
            />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {feature.title}
            </h3>
            <p style={{ color: '#666' }}>{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Stats */}
      <motion.div 
        className="grid-3" 
        style={{ marginTop: '3rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="card text-center">
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2E8B57' }}>1000+</div>
          <div style={{ color: '#666' }}>Products Tracked</div>
        </div>
        <div className="card text-center">
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2E8B57' }}>50+</div>
          <div style={{ color: '#666' }}>Partner Stores</div>
        </div>
        <div className="card text-center">
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2E8B57' }}>30%</div>
          <div style={{ color: '#666' }}>Average Savings</div>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;