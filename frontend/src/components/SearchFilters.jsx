import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function SearchFilters({ 
  filters, 
  onFiltersChange, 
  categories = [], 
  stores = [],
  onClearFilters 
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    onClearFilters();
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== '' && value !== undefined && value !== null
  ).length;

  return (
    <div className="mb-6">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FunnelIcon className="w-5 h-5" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border border-gray-200 rounded-lg p-4 mb-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Search Input */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Products
                </label>
                <input
                  type="text"
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Enter product name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category || ''}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Store Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store
                </label>
                <select
                  value={filters.store || ''}
                  onChange={(e) => handleFilterChange('store', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Stores</option>
                  {stores.map(store => (
                    <option key={store._id} value={store._id}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={filters.minPrice || ''}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  placeholder="100.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy || 'name'}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="name">Name A-Z</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="deal_score">Best Deals</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* Show Only Deals */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="dealsOnly"
                  checked={filters.dealsOnly || false}
                  onChange={(e) => handleFilterChange('dealsOnly', e.target.checked)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="dealsOnly" className="ml-2 text-sm text-gray-700">
                  Show only deals
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (!value || value === '') return null;
            
            let displayValue = value;
            if (key === 'dealsOnly' && value) displayValue = 'Deals only';
            if (key === 'sortBy') {
              const sortLabels = {
                'name': 'Name A-Z',
                'price_low': 'Price: Low to High',
                'price_high': 'Price: High to Low',
                'deal_score': 'Best Deals',
                'newest': 'Newest First'
              };
              displayValue = sortLabels[value] || value;
            }

            return (
              <span
                key={key}
                className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
              >
                {displayValue}
                <button
                  onClick={() => handleFilterChange(key, '')}
                  className="ml-1 hover:text-red-600 transition-colors"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
