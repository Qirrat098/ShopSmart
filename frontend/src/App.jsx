// src/App.jsx (Updated with AuthProvider)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Search from './pages/Search';
import Deals from './pages/Deals';
import MyList from './pages/MyList';
import Profile from './pages/Profile';
import Login from './pages/Login';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
          <Navbar />
          <AnimatePresence mode="wait">
            <motion.main 
              className="min-h-screen"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/deals" element={<Deals />} />
                <Route 
                  path="/my-list" 
                  element={
                    <ProtectedRoute>
                      <MyList />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/login" element={<Login />} />
              </Routes>
            </motion.main>
          </AnimatePresence>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;