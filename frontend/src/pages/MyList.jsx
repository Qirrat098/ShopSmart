import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBagIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  StarIcon,
  FireIcon,
  TruckIcon,
  CalculatorIcon,
  ArrowRightIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function MyList() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shoppingLists, setShoppingLists] = useState([
    {
      id: 1,
      name: 'Weekly Groceries',
      items: [
        { id: 1, name: 'Organic Bananas', quantity: 2, unit: 'bunch', price: 3.99, store: 'Fresh Market', priority: 'high', checked: false },
        { id: 2, name: 'Whole Milk', quantity: 1, unit: 'gallon', price: 4.49, store: 'Local Grocery', priority: 'high', checked: false },
        { id: 3, name: 'Whole Grain Bread', quantity: 2, unit: 'loaf', price: 3.99, store: 'Fresh Market', priority: 'medium', checked: true },
        { id: 4, name: 'Fresh Spinach', quantity: 1, unit: 'bag', price: 2.99, store: 'Local Grocery', priority: 'medium', checked: false },
        { id: 5, name: 'Chicken Breast', quantity: 2, unit: 'lbs', price: 8.99, store: 'Fresh Market', priority: 'high', checked: false }
      ],
      totalEstimatedCost: 24.45,
      storeOptimization: {
        totalStores: 2,
        totalSavings: 5.23,
        optimizedRoute: ['Fresh Market', 'Local Grocery']
      }
    }
  ]);
  const [activeList, setActiveList] = useState(0);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    unit: 'piece',
    price: '',
    store: '',
    priority: 'medium'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleAddItem = () => {
    if (newItem.name.trim()) {
      const item = {
        id: Date.now(),
        ...newItem,
        checked: false
      };
      
      setShoppingLists(prev => prev.map((list, index) => 
        index === activeList 
          ? { 
              ...list, 
              items: [...list.items, item],
              totalEstimatedCost: list.totalEstimatedCost + (parseFloat(newItem.price) || 0)
            }
          : list
      ));
      
      setNewItem({ name: '', quantity: 1, unit: 'piece', price: '', store: '', priority: 'medium' });
      setIsAddingItem(false);
    }
  };

  const handleToggleItem = (itemId) => {
    setShoppingLists(prev => prev.map((list, index) => 
      index === activeList 
        ? { 
            ...list, 
            items: list.items.map(item => 
              item.id === itemId ? { ...item, checked: !item.checked } : item
            )
          }
        : list
    ));
  };

  const handleDeleteItem = (itemId) => {
    setShoppingLists(prev => prev.map((list, index) => 
      index === activeList 
        ? { 
            ...list, 
            items: list.items.filter(item => item.id !== itemId),
            totalEstimatedCost: list.items
              .filter(item => item.id !== itemId)
              .reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0)
          }
        : list
    ));
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editingItem && editingItem.name.trim()) {
      setShoppingLists(prev => prev.map((list, index) => 
        index === activeList 
          ? { 
              ...list, 
              items: list.items.map(item => 
                item.id === editingItem.id ? editingItem : item
              ),
              totalEstimatedCost: list.items
                .map(item => item.id === editingItem.id ? editingItem : item)
                .reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0)
            }
          : list
      ));
      
      setIsEditing(false);
      setEditingItem(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingItem(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <FireIcon className="w-4 h-4" />;
      case 'medium': return <StarIcon className="w-4 h-4" />;
      case 'low': return <CheckIcon className="w-4 h-4" />;
      default: return <StarIcon className="w-4 h-4" />;
    }
  };

  if (!user) {
    return null;
  }

  const currentList = shoppingLists[activeList];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Shopping Lists</h1>
          <p className="text-xl text-gray-600">Organize your grocery shopping and save money</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { icon: ShoppingBagIcon, label: 'Total Lists', value: shoppingLists.length, color: 'blue' },
            { icon: CalculatorIcon, label: 'Total Items', value: currentList?.items.length || 0, color: 'green' },
            { icon: TruckIcon, label: 'Stores', value: currentList?.storeOptimization.totalStores || 0, color: 'purple' },
            { icon: StarIcon, label: 'Total Savings', value: `$${currentList?.storeOptimization.totalSavings.toFixed(2) || '0.00'}`, color: 'yellow' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shopping List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{currentList?.name}</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAddingItem(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <PlusIcon className="w-5 h-5" />
                  Add Item
                </motion.button>
              </div>

              {/* Add Item Form */}
              <AnimatePresence>
                {isAddingItem && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border border-gray-200 rounded-lg p-6 mb-6 bg-gray-50"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Item</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Item name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <select
                        value={newItem.unit}
                        onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="piece">piece</option>
                        <option value="kg">kg</option>
                        <option value="lbs">lbs</option>
                        <option value="gallon">gallon</option>
                        <option value="bunch">bunch</option>
                        <option value="bag">bag</option>
                      </select>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Store"
                        value={newItem.store}
                        onChange={(e) => setNewItem({ ...newItem, store: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <select
                        value={newItem.priority}
                        onChange={(e) => setNewItem({ ...newItem, priority: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddItem}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Add Item
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsAddingItem(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Items List */}
              <div className="space-y-3">
                {currentList?.items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 ${
                      item.checked 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleToggleItem(item.id)}
                      className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className={`font-medium ${item.checked ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {item.name}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                          {getPriorityIcon(item.priority)}
                          <span className="ml-1 capitalize">{item.priority}</span>
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {item.quantity} {item.unit} • {item.store} • ${item.price}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEditItem(item)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {(!currentList?.items || currentList.items.length === 0) && (
                <div className="text-center py-12">
                  <ShoppingBagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your list is empty</h3>
                  <p className="text-gray-600 mb-6">Start adding items to create your shopping list</p>
                  <button
                    onClick={() => setIsAddingItem(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <PlusIcon className="w-5 h-5" />
                    Add First Item
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="space-y-6">
              {/* Store Optimization */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Store Optimization</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Cost:</span>
                    <span className="font-semibold text-gray-900">${currentList?.totalEstimatedCost.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Stores to Visit:</span>
                    <span className="font-semibold text-gray-900">{currentList?.storeOptimization.totalStores}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Potential Savings:</span>
                    <span className="font-semibold text-green-600">${currentList?.storeOptimization.totalSavings.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Optimized Route:</h4>
                  <div className="space-y-2">
                    {currentList?.storeOptimization.optimizedRoute.map((store, index) => (
                      <div key={store} className="flex items-center gap-2 text-sm text-green-700">
                        <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </span>
                        {store}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/search')}
                    className="w-full flex items-center justify-between p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-gray-700">Browse Products</span>
                    <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/deals')}
                    className="w-full flex items-center justify-between p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-gray-700">View Deals</span>
                    <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-gray-700">Share List</span>
                    <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                  </motion.button>
                </div>
              </div>

              {/* Progress */}
              {currentList?.items && currentList.items.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Items Completed</span>
                      <span className="font-medium text-gray-900">
                        {currentList.items.filter(item => item.checked).length} / {currentList.items.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(currentList.items.filter(item => item.checked).length / currentList.items.length) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 text-center">
                      {Math.round((currentList.items.filter(item => item.checked).length / currentList.items.length) * 100)}% Complete
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Edit Item Modal */}
        <AnimatePresence>
          {isEditing && editingItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl p-6 w-full max-w-md"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Item</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Item name"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={editingItem.quantity}
                      onChange={(e) => setEditingItem({ ...editingItem, quantity: parseInt(e.target.value) || 1 })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <select
                      value={editingItem.unit}
                      onChange={(e) => setEditingItem({ ...editingItem, unit: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="piece">piece</option>
                      <option value="kg">kg</option>
                      <option value="lbs">lbs</option>
                      <option value="gallon">gallon</option>
                      <option value="bunch">bunch</option>
                      <option value="bag">bag</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Price"
                      value={editingItem.price}
                      onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <select
                      value={editingItem.priority}
                      onChange={(e) => setEditingItem({ ...editingItem, priority: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Store"
                    value={editingItem.store}
                    onChange={(e) => setEditingItem({ ...editingItem, store: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSaveEdit}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Save Changes
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancelEdit}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}