import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHotel, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const AdminNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-red-900 to-red-800 text-white sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/admin" className="flex items-center space-x-2 text-xl font-bold group">
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-1.5 rounded-lg transform group-hover:scale-110 transition">
              <FaHotel />
            </div>
            <span>LuxeStay</span>
            <span className="bg-yellow-500 text-red-900 text-xs px-2 py-0.5 rounded-full ml-2">Admin</span>
          </Link>

          {/* Desktop Menu - Only Logout */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg transition font-medium"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-3 space-y-2">
            <button 
              onClick={handleLogout}
              className="block w-full text-center bg-red-700 py-2 rounded-lg hover:bg-red-600 transition font-medium"
            >
              <FaSignOutAlt className="inline mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;