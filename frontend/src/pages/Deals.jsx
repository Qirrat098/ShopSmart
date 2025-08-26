// src/pages/Deals.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FireIcon, 
  SparklesIcon, 
  TagIcon,
  ShoppingBagIcon,
  StarIcon,
  ArrowRightIcon,
  BellIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { getFeaturedDeals, getItems } from '../api';
import ItemCard from '../components/ItemCard';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Deals() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('deal_score');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const dealsData = await getFeaturedDeals();
        setDeals(dealsData);
      } catch (err) {
        console.error('Failed to load deals:', err);
        setError('Failed to load deals. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const handleAddToCart = async (item) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    try {
      // Add to shopping list logic here
      console.log('Adding to cart:', item.name);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const handleToggleFavorite = async (itemId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    try {
      // Toggle favorite logic here
      console.log('Toggling favorite for item:', itemId);
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    }
  };

  const handleSetAlert = async (itemId, targetPrice) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    try {
      // Set price alert logic here
      console.log('Setting alert for item:', itemId, 'at price:', targetPrice);
    } catch (err) {
      console.error('Failed to set alert:', err);
    }
  };

  const handleViewDetails = (item) => {
    // Navigate to item details page or show modal
    console.log('Viewing details for:', item.name);
  };

  const sortedDeals = [...deals].sort((a, b) => {
    switch (sortBy) {
      case 'deal_score':
        return (b.dealScore || 0) - (a.dealScore || 0);
      case 'discount_amount':
        const maxDiscountA = Math.max(...(a.prices?.map(p => p.discount || 0) || [0]));
        const maxDiscountB = Math.max(...(b.prices?.map(p => p.discount || 0) || [0]));
        return maxDiscountB - maxDiscountA;
      case 'price_low':
        const minPriceA = Math.min(...(a.prices?.map(p => p.currentPrice || 0) || [0]));
        const minPriceB = Math.min(...(b.prices?.map(p => p.currentPrice || 0) || [0]));
        return minPriceA - minPriceB;
      case 'price_high':
        const maxPriceA = Math.max(...(a.prices?.map(p => p.currentPrice || 0) || [0]));
        const maxPriceB = Math.max(...(b.prices?.map(p => p.currentPrice || 0) || [0]));
        return maxPriceB - maxPriceA;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing deals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <FireIcon className="w-16 h-16 text-yellow-300" />
              <h1 className="text-5xl lg:text-6xl font-bold">HOT DEALS</h1>
              <SparklesIcon className="w-16 h-16 text-yellow-300" />
            </div>
            <p className="text-xl lg:text-2xl text-orange-100 max-w-3xl mx-auto mb-8">
              Discover incredible discounts and amazing offers on your favorite grocery products. 
              Don't miss out on these limited-time deals!
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-300">{deals.length}</div>
                <div className="text-orange-100">Active Deals</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-300">
                  {Math.round(deals.reduce((acc, item) => {
                    const maxDiscount = Math.max(...(item.prices?.map(p => p.discount || 0) || [0]));
                    return acc + maxDiscount;
                  }, 0) / deals.length)}%
                </div>
                <div className="text-orange-100">Avg. Discount</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-300">
                  {deals.reduce((acc, item) => acc + (item.prices?.length || 0), 0)}
                </div>
                <div className="text-orange-100">Store Options</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <label className="text-gray-700 font-medium">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="deal_score">Best Deals</option>
              <option value="discount_amount">Highest Discount</option>
              <option value="price_low">Lowest Price</option>
              <option value="price_high">Highest Price</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8"
          >
            {error}
          </motion.div>
        )}

        {/* Deals Grid/List */}
        {sortedDeals.length > 0 ? (
          <motion.div
            layout
            className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                : "space-y-4"
            }
          >
            {sortedDeals.map((item, index) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <ItemCard
                  item={item}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  onSetAlert={handleSetAlert}
                  onViewDetails={handleViewDetails}
                  isFavorite={false}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* No deals available */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <TagIcon className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No deals available</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Check back later for amazing deals and discounts on your favorite products.
            </p>
            <button
              onClick={() => navigate('/search')}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Browse All Products
            </button>
          </motion.div>
        )}

        {/* CTA Section */}
        {sortedDeals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-r from-green-50 to-orange-50 rounded-2xl p-12 border border-green-100">
              <div className="flex items-center justify-center gap-3 mb-6">
                <BellIcon className="w-12 h-12 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-900">Never Miss a Deal Again!</h2>
              </div>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Set price alerts for your favorite products and get notified instantly when prices drop. 
                Stay ahead of the game and save more on every purchase.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/search')}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
                >
                  <EyeIcon className="w-5 h-5" />
                  Browse More Products
                </button>
                {!user && (
                  <button
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center gap-2 px-8 py-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors font-semibold text-lg"
                  >
                    <StarIcon className="w-5 h-5" />
                    Sign Up for Alerts
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Deal Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Shop by Deal Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FireIcon, title: "Flash Sales", color: "red", count: "24h Left" },
              { icon: TagIcon, title: "Clearance", color: "orange", count: "Up to 70%" },
              { icon: StarIcon, title: "New Arrivals", color: "yellow", count: "Fresh Deals" },
              { icon: ShoppingBagIcon, title: "Bulk Deals", color: "green", count: "Save More" }
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className={`w-16 h-16 bg-${category.color}-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-${category.color}-200 transition-colors`}>
                  <category.icon className={`w-8 h-8 text-${category.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-500 text-center">
                  {category.count}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12 text-center text-white"
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Stay Updated on Latest Deals</h2>
            <p className="text-orange-100 mb-8 text-lg">
              Subscribe to our newsletter and be the first to know about exclusive offers, 
              flash sales, and incredible discounts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

