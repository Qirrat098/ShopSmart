import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  UserIcon,
  CogIcon,
  BellIcon,
  HeartIcon,
  ShoppingBagIcon,
  StarIcon,
  FireIcon,
  ArrowRightIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    photoURL: user?.photoURL || ''
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [stats, setStats] = useState({
    totalOrders: 24,
    totalSpent: 1247.89,
    favoriteItems: 18,
    activeAlerts: 7
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      // Update profile logic here
      console.log('Saving profile:', editForm);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditForm({
      displayName: user?.displayName || '',
      email: user?.email || '',
      photoURL: user?.photoURL || ''
    });
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'preferences', name: 'Preferences', icon: CogIcon },
    { id: 'favorites', name: 'Favorites', icon: HeartIcon },
    { id: 'alerts', name: 'Price Alerts', icon: BellIcon },
    { id: 'orders', name: 'Order History', icon: ShoppingBagIcon }
  ];

  if (!user) {
    return null;
  }

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
          <p className="text-xl text-gray-600">Manage your account and preferences</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { icon: ShoppingBagIcon, label: 'Total Orders', value: stats.totalOrders, color: 'blue' },
            { icon: FireIcon, label: 'Total Spent', value: `$${stats.totalSpent.toFixed(2)}`, color: 'green' },
            { icon: HeartIcon, label: 'Favorites', value: stats.favoriteItems, color: 'red' },
            { icon: BellIcon, label: 'Active Alerts', value: stats.activeAlerts, color: 'yellow' }
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-green-100 text-green-700 border-r-2 border-green-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                    {!isEditing && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <PencilIcon className="w-4 h-4" />
                        Edit Profile
                      </motion.button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Profile Picture
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                            {user.photoURL ? (
                              <img src={user.photoURL} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                            ) : (
                              <UserIcon className="w-10 h-10 text-gray-400" />
                            )}
                          </div>
                          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            Change Photo
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Display Name
                        </label>
                        <input
                          type="text"
                          value={editForm.displayName}
                          onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <div className="flex gap-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSaveProfile}
                          className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                          <CheckIcon className="w-5 h-5 inline mr-2" />
                          Save Changes
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleCancelEdit}
                          className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                          <XMarkIcon className="w-5 h-5 inline mr-2" />
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                          {user.photoURL ? (
                            <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                          ) : (
                            <UserIcon className="w-12 h-12 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{user.displayName || 'User'}</h3>
                          <p className="text-gray-600">{user.email}</p>
                          <p className="text-sm text-gray-500">Member since {new Date().getFullYear()}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Account Details</h4>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p><span className="font-medium">Email:</span> {user.email}</p>
                            <p><span className="font-medium">Display Name:</span> {user.displayName || 'Not set'}</p>
                            <p><span className="font-medium">Account Type:</span> Standard</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Preferences</h4>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p><span className="font-medium">Notifications:</span> Enabled</p>
                            <p><span className="font-medium">Language:</span> English</p>
                            <p><span className="font-medium">Currency:</span> USD</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Preferences</h2>
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
                      <div className="space-y-4">
                        {[
                          'Price drop alerts',
                          'New deals notifications',
                          'Order updates',
                          'Newsletter'
                        ].map((setting) => (
                          <div key={setting} className="flex items-center justify-between">
                            <span className="text-gray-700">{setting}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" defaultChecked className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Shopping Preferences</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Currency</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                            <option>USD ($)</option>
                            <option>EUR (€)</option>
                            <option>GBP (£)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Favorite Items</h2>
                  <div className="text-center py-12">
                    <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
                    <p className="text-gray-600 mb-6">Start adding items to your favorites to see them here</p>
                    <button
                      onClick={() => navigate('/search')}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Browse Products
                      <ArrowRightIcon className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Price Alerts Tab */}
              {activeTab === 'alerts' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Price Alerts</h2>
                  <div className="text-center py-12">
                    <BellIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No price alerts set</h3>
                    <p className="text-gray-600 mb-6">Set price alerts for products you're interested in</p>
                    <button
                      onClick={() => navigate('/search')}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Set Alerts
                      <ArrowRightIcon className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Order History Tab */}
              {activeTab === 'orders' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Order History</h2>
                  <div className="text-center py-12">
                    <ShoppingBagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-6">Your order history will appear here once you make your first purchase</p>
                    <button
                      onClick={() => navigate('/search')}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Start Shopping
                      <ArrowRightIcon className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Logout Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 border border-red-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Actions</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Sign Out
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Delete Account
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}