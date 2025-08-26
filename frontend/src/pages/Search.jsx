// src/pages/Search.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  AdjustmentsHorizontalIcon,
  FunnelIcon,
  XMarkIcon,
  ShoppingBagIcon,
  FireIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { getItems, getStores } from '../api';
import ItemCard from '../components/ItemCard';
import SearchFilters from '../components/SearchFilters';
import { useAuth } from '../contexts/AuthContext';

export default function Search() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    store: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'name',
    dealsOnly: false
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [storesData, itemsData] = await Promise.all([
          getStores(),
          getItems({ limit: 1000 })
        ]);

        setStores(storesData);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(itemsData.items.map(item => item.category))];
        setCategories(uniqueCategories);
        
        // Set initial items
        setItems(itemsData.items.slice(0, pagination.itemsPerPage));
        setPagination(prev => ({
          ...prev,
          totalItems: itemsData.items.length,
          totalPages: Math.ceil(itemsData.items.length / prev.itemsPerPage)
        }));
      } catch (err) {
        console.error('Failed to load initial data:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchFilteredItems = async () => {
      if (!loading) {
        try {
          setLoading(true);
          const response = await getItems({
            search: filters.search,
            category: filters.category,
            store: filters.store,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            sortBy: filters.sortBy,
            dealsOnly: filters.dealsOnly,
            page: pagination.currentPage,
            limit: pagination.itemsPerPage
          });

          setItems(response.items);
          setPagination(prev => ({
            ...prev,
            totalItems: response.totalItems || response.items.length,
            totalPages: Math.ceil((response.totalItems || response.items.length) / prev.itemsPerPage)
          }));
        } catch (err) {
          console.error('Failed to fetch filtered items:', err);
          setError('Failed to load products. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };

    // Debounce the search
    const timeoutId = setTimeout(fetchFilteredItems, 300);
    return () => clearTimeout(timeoutId);
  }, [filters, pagination.currentPage]);

  const handleFiltersChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      store: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name',
      dealsOnly: false
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = async (item) => {
    if (!user) {
      // Redirect to login or show login modal
      console.log('User not logged in');
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
      console.log('User not logged in');
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
      console.log('User not logged in');
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

  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Searching for amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Discover Amazing Products
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto mb-8">
              Find the best deals and compare prices across multiple stores
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products, brands, or categories..."
                  value={filters.search}
                  onChange={(e) => handleFiltersChange({ search: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 text-lg text-gray-900 rounded-full focus:outline-none focus:ring-4 focus:ring-white/20 shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Filters */}
        <SearchFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          categories={categories}
          stores={stores}
          onClearFilters={clearFilters}
        />

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <MagnifyingGlassIcon className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 font-medium">
                {pagination.totalItems} products found
              </span>
            </div>
            {filters.search && (
              <span className="text-sm text-gray-500">
                for "{filters.search}"
              </span>
            )}
          </div>
          
          {items.length > 0 && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              
              {/* Sort Options */}
              <select
                value={filters.sortBy}
                onChange={(e) => handleFiltersChange({ sortBy: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="deal_score">Best Deals</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          )}
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* Products Grid */}
        {items.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
          >
            {items.map((item, index) => (
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
          /* No Results */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <AdjustmentsHorizontalIcon className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No products found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Try adjusting your search criteria or filters to find what you're looking for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Clear All Filters
              </button>
              <button
                onClick={() => handleFiltersChange({ search: '', category: '', store: '' })}
                className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
              >
                Browse All Products
              </button>
            </div>
          </motion.div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (pagination.currentPage <= 3) {
                  pageNum = i + 1;
                } else if (pagination.currentPage >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = pagination.currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      pageNum === pagination.currentPage
                        ? 'bg-green-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </motion.div>
        )}

        {/* Quick Actions */}
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Need help finding something?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleFiltersChange({ dealsOnly: true })}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <FireIcon className="w-5 h-5" />
                Show Only Deals
              </button>
              <button
                onClick={() => handleFiltersChange({ category: 'Vegetables' })}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                Browse Vegetables
              </button>
              <button
                onClick={() => handleFiltersChange({ category: 'Fruit' })}
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                <StarIcon className="w-5 h-5" />
                Browse Fruits
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
