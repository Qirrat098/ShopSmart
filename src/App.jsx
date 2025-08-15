// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Deals from './pages/Deals';
import MyList from './pages/MyList';
import Profile from './pages/Profile';
import Login from './pages/Login';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <motion.main 
          className="main-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </motion.main>
      </div>
    </Router>
  );
}

export default App;