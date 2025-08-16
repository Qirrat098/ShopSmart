// src/components/Navbar.jsx (Updated with Auth)
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  TagIcon, 
  ListBulletIcon, 
  UserIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import '../components/Navbar.css';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/search', icon: MagnifyingGlassIcon, label: 'Search' },
    { path: '/deals', icon: TagIcon, label: 'Deals' },
    { path: '/my-list', icon: ListBulletIcon, label: 'My List', protected: true },
    { path: '/profile', icon: UserIcon, label: 'Profile', protected: true }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🛒 ShopSmart
          </motion.div>
        </NavLink>
        
        <div className="navbar-menu">
          {navItems.map(({ path, icon: Icon, label, protected: isProtected }) => {
            // Hide protected routes if user is not logged in
            if (isProtected && !currentUser) return null;
            
            return (
              <NavLink 
                key={path}
                to={path} 
                className={({ isActive }) => 
                  `navbar-item ${isActive ? 'active' : ''}`
                }
              >
                <motion.div
                  className="navbar-item-content"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Icon className="navbar-icon" />
                  <span className="navbar-label">{label}</span>
                </motion.div>
              </NavLink>
            );
          })}

          {/* Auth buttons */}
          {currentUser ? (
            <div className="navbar-user">
              <span className="user-name">
                {currentUser.displayName || currentUser.email}
              </span>
              <button 
                onClick={handleLogout}
                className="navbar-item logout-btn"
                title="Logout"
              >
                <motion.div
                  className="navbar-item-content"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <ArrowRightOnRectangleIcon className="navbar-icon" />
                  <span className="navbar-label">Logout</span>
                </motion.div>
              </button>
            </div>
          ) : (
            <NavLink 
              to="/login" 
              className={({ isActive }) => 
                `navbar-item login-btn ${isActive ? 'active' : ''}`
              }
            >
              <motion.div
                className="navbar-item-content"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <UserIcon className="navbar-icon" />
                <span className="navbar-label">Login</span>
              </motion.div>
            </NavLink>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;