import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  HeartIcon, 
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search page with query
      window.location.href = `/search?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/search' },
    { name: 'Deals', path: '/deals' },
    { name: 'About', path: '/about' }
  ];

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-green-100' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  Green Grocer
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'text-green-600'
                        : 'text-gray-700 hover:text-green-600'
                    }`}
                  >
                    {item.name}
                    {location.pathname === item.path && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"
                        layoutId="navbar-indicator"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 pl-10 pr-4 text-sm bg-white/80 backdrop-blur-sm border border-green-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-700 transition-colors"
                >
                  <MagnifyingGlassIcon className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                <HeartIcon className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </motion.button>

              {/* Shopping Cart */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                <ShoppingBagIcon className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </motion.button>

              {/* User Menu */}
              {user ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <button className="flex items-center space-x-2 p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors">
                    <UserIcon className="w-5 h-5 text-green-700" />
                    <span className="text-sm font-medium text-green-700 hidden sm:block">
                      {user.displayName || user.email}
                    </span>
                  </button>
                </motion.div>
              ) : (
                <div className="hidden lg:flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
                  >
                    <Link to="/login">Login</Link>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Link to="/login">Sign up</Link>
                  </motion.button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-white border-b border-green-100 shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full px-4 py-3 pl-10 pr-4 text-sm bg-gray-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-600" />
              </form>

              {/* Mobile Navigation */}
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile User Actions */}
              {!user && (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
}