import { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, ShoppingCartIcon, BellIcon, EyeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

export default function ItemCard({ 
  item, 
  onAddToCart, 
  onToggleFavorite, 
  onSetAlert, 
  onViewDetails,
  isFavorite = false,
  showPriceComparison = true 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [targetPrice, setTargetPrice] = useState('');

  const handleSetAlert = () => {
    if (targetPrice && onSetAlert) {
      onSetAlert(item._id, parseFloat(targetPrice));
      setShowAlertModal(false);
      setTargetPrice('');
    }
  };

  const cheapestPrice = item.prices?.reduce((min, price) => 
    price.currentPrice < min.currentPrice ? price : min
  );

  const hasDiscount = item.prices?.some(price => price.discount > 0);

  return (
    <>
      <motion.div
        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image Container */}
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          <img
            src={item.image || 'https://via.placeholder.com/300x200?text=No+Image'}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              SALE
            </div>
          )}
          
          {/* Favorite Button */}
          <button
            onClick={() => onToggleFavorite?.(item._id)}
            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            {isFavorite ? (
              <HeartSolidIcon className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category & Brand */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {item.category}
            </span>
            {item.brand && (
              <span className="text-xs text-gray-500">{item.brand}</span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {item.name}
          </h3>

          {/* Price Comparison */}
          {showPriceComparison && item.prices && (
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-green-600">
                  ${cheapestPrice?.currentPrice?.toFixed(2)}
                </span>
                {item.prices.length > 1 && (
                  <span className="text-sm text-gray-500">
                    {item.prices.length} stores
                  </span>
                )}
              </div>
              
              {/* Store Logos */}
              <div className="flex items-center gap-2">
                {item.prices.slice(0, 3).map((price, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <img
                      src={price.store?.logo || 'https://via.placeholder.com/20x20?text=Store'}
                      alt={price.store?.name || 'Store'}
                      className="w-5 h-5 rounded object-contain"
                    />
                    <span className="text-xs text-gray-600">
                      ${price.currentPrice.toFixed(2)}
                    </span>
                  </div>
                ))}
                {item.prices.length > 3 && (
                  <span className="text-xs text-gray-400">
                    +{item.prices.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onAddToCart?.(item)}
              className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCartIcon className="w-4 h-4" />
              Add to List
            </button>
            
            <button
              onClick={() => setShowAlertModal(true)}
              className="p-2 text-gray-600 hover:text-green-600 transition-colors"
              title="Set Price Alert"
            >
              <BellIcon className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => onViewDetails?.(item)}
              className="p-2 text-gray-600 hover:text-green-600 transition-colors"
              title="View Details"
            >
              <EyeIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Price Alert Modal */}
      {showAlertModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-lg p-6 w-80 max-w-[90vw]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <h3 className="text-lg font-semibold mb-4">Set Price Alert</h3>
            <p className="text-gray-600 mb-4">
              Get notified when {item.name} drops below your target price.
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowAlertModal(false)}
                className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSetAlert}
                disabled={!targetPrice}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Set Alert
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
