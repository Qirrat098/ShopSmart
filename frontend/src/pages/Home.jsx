import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  FireIcon, 
  StarIcon, 
  ShoppingBagIcon,
  ArrowRightIcon,
  PhoneIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import { mockFeaturedDeals, mockItems, mockStores, mockCategories } from '../mockData';
import ItemCard from '../components/ItemCard';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [featuredDeals, setFeaturedDeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use mock data for now instead of API calls
    const loadMockData = () => {
      setFeaturedDeals(mockFeaturedDeals);
      setCategories(mockCategories);
      setStores(mockStores);
      setLoading(false);
    };

    // Simulate loading delay
    setTimeout(loadMockData, 1000);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    if (searchTerm.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/search?category=${encodeURIComponent(category)}`);
  };

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-50 via-green-50 to-yellow-100 py-20 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Ultimate Online{' '}
                <span className="text-green-600">Grocery</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                Experience grocery shopping and swift home delivery with our wide range of fresh produce and essentials.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg shadow-lg"
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-yellow-400/20 rounded-3xl"></div>
                <div className="absolute inset-4 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <ShoppingBagIcon className="w-16 h-16 text-white" />
                    </div>
                    <p className="text-gray-600 text-lg">Fresh Produce Basket</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: PhoneIcon, title: "Support 24h", color: "blue" },
              { icon: ShieldCheckIcon, title: "Secure Payment", color: "green" },
              { icon: ArrowPathIcon, title: "Refundable", color: "purple" },
              { icon: TruckIcon, title: "Free Shipping", subtitle: "Over $40", color: "orange" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`w-16 h-16 bg-${feature.color}-100 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:bg-${feature.color}-200 transition-colors`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                {feature.subtitle && (
                  <p className="text-sm text-gray-500">{feature.subtitle}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Summer Sale Banner */}
            <motion.div
              whileHover={{ y: -5 }}
              className="relative bg-gradient-to-br from-green-500 to-green-600 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">SUMMER SALE</h3>
                <div className="text-4xl font-bold mb-2">40% OFF</div>
                <p className="text-green-100 mb-6">Fresh Fruit 100%</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Shop Now
                  <ArrowRightIcon className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            </motion.div>

            {/* Fresh Delivered Banner */}
            <motion.div
              whileHover={{ y: -5 }}
              className="relative bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Fresh Delivered Daily</h3>
                <p className="text-yellow-100 mb-6">Get your groceries delivered fresh every day</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-yellow-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Order Now
                  <ArrowRightIcon className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Category</h2>
            <p className="text-gray-600">Browse our most popular product categories</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-6"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryClick(category)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <ShoppingBagIcon className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                  {category}
                </h3>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Eco-Friendly Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-3xl"></div>
                <div className="absolute inset-4 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <StarIcon className="w-16 h-16 text-white" />
                    </div>
                    <p className="text-gray-600 text-lg">Eco-Friendly Products</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">ECO-Friendly</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Discover a vibrant array of locally sourced and eco-friendly products on our grocery web store, connecting you with sustainable choices that support both the community and the planet.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors font-semibold text-lg"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Daily Best Sellers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Daily Best Sellers</h2>
            <p className="text-gray-600">Our most popular products that customers love</p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {['All', 'Top sell', 'New', 'Vegetables', 'Fruit'].map((tab) => (
              <button
                key={tab}
                className="px-6 py-2 rounded-full border border-green-200 text-green-600 hover:bg-green-50 transition-colors"
              >
                {tab}
              </button>
            ))}
          </motion.div>

          {/* Products Grid */}
          {featuredDeals.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {featuredDeals.map((item, index) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
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
            <div className="text-center py-12">
              <ShoppingBagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No featured deals available at the moment.</p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-8"
          >
            <button
              onClick={() => navigate('/search')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
            >
              Show More
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="flex-1 max-w-md px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                SUBSCRIBE
              </motion.button>
            </div>
            <p className="text-green-100">Sign up for new Customer, updates, surveys.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
