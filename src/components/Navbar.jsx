import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  TagIcon, 
  ListBulletIcon, 
  UserIcon 
} from '@heroicons/react/24/outline';
import './Navbar.css'

function Navbar() {
  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/search', icon: MagnifyingGlassIcon, label: 'Search' },
    { path: '/deals', icon: TagIcon, label: 'Deals' },
    { path: '/my-list', icon: ListBulletIcon, label: 'My List' },
    { path: '/profile', icon: UserIcon, label: 'Profile' }
  ];

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
          {navItems.map(({ path, icon: Icon, label }) => (
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
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;