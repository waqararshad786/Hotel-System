import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FaHotel, FaUser, FaSignOutAlt, FaBars, FaTimes, FaBookmark, 
  FaHeart, FaNewspaper, FaMapMarkedAlt, FaLightbulb, 
  FaInfoCircle, FaEnvelope, FaQuestionCircle, FaFileAlt 
} from 'react-icons/fa';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pagesDropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const pagesTimeoutRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsDropdownOpen(false), 200);
  };

  const handlePagesMouseEnter = () => {
    if (pagesTimeoutRef.current) clearTimeout(pagesTimeoutRef.current);
    setIsPagesDropdownOpen(true);
  };

  const handlePagesMouseLeave = () => {
    pagesTimeoutRef.current = setTimeout(() => setIsPagesDropdownOpen(false), 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (pagesTimeoutRef.current) clearTimeout(pagesTimeoutRef.current);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 text-white sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold group">
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-2 rounded-lg transform group-hover:scale-110 transition">
              <FaHotel />
            </div>
            <span className="gradient-text">LuxeStay</span>
          </Link>

          {/* Desktop Menu - User Items Only */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-orange-400 transition font-medium">Home</Link>
            <Link to="/hotels" className="hover:text-orange-400 transition font-medium">Hotels</Link>
            <Link to="/wishlist" className="hover:text-orange-400 transition flex items-center gap-1 font-medium">
              <FaHeart /> Wishlist
            </Link>
            
            {/* Pages Dropdown */}
            <div 
              className="relative"
              ref={pagesDropdownRef}
              onMouseEnter={handlePagesMouseEnter}
              onMouseLeave={handlePagesMouseLeave}
            >
              <button className="hover:text-orange-400 transition flex items-center gap-1 font-medium">
                Pages <span className="text-xs">▼</span>
              </button>
              
              {isPagesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white text-gray-800 rounded-xl shadow-2xl py-2 z-50 animate-fade-in">
                  <Link to="/about" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsPagesDropdownOpen(false)}>
                    <FaInfoCircle className="inline mr-2 text-blue-900" /> About Us
                  </Link>
                  <Link to="/contact" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsPagesDropdownOpen(false)}>
                    <FaEnvelope className="inline mr-2 text-blue-900" /> Contact
                  </Link>
                  <Link to="/faq" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsPagesDropdownOpen(false)}>
                    <FaQuestionCircle className="inline mr-2 text-blue-900" /> FAQ
                  </Link>
                  <hr className="my-1" />
                  <Link to="/blog" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsPagesDropdownOpen(false)}>
                    <FaNewspaper className="inline mr-2 text-blue-900" /> Travel Blog
                  </Link>
                  <Link to="/destinations" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsPagesDropdownOpen(false)}>
                    <FaMapMarkedAlt className="inline mr-2 text-blue-900" /> Destinations
                  </Link>
                  <Link to="/travel-tips" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsPagesDropdownOpen(false)}>
                    <FaLightbulb className="inline mr-2 text-blue-900" /> Travel Tips
                  </Link>
                  <hr className="my-1" />
                  <Link to="/hotel-policies" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsPagesDropdownOpen(false)}>
                    <FaFileAlt className="inline mr-2 text-blue-900" /> Hotel Policies
                  </Link>
                  <Link to="/terms" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsPagesDropdownOpen(false)}>
                    📜 Terms & Conditions
                  </Link>
                  <Link to="/privacy" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsPagesDropdownOpen(false)}>
                    🔒 Privacy Policy
                  </Link>
                </div>
              )}
            </div>
            
            {isAuthenticated ? (
              <>
                <Link to="/bookings" className="hover:text-orange-400 transition flex items-center gap-1 font-medium">
                  <FaBookmark /> My Bookings
                </Link>
                
                {/* User Dropdown */}
                <div 
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center gap-2 hover:text-orange-400 transition bg-blue-800 px-3 py-1 rounded-full">
                    <FaUser />
                    {user?.name?.split(' ')[0]}
                    <span className="text-xs">▼</span>
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-2xl py-2 z-50 animate-fade-in">
                      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>
                        👤 My Profile
                      </Link>
                      <Link to="/bookings" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>
                        📅 My Bookings
                      </Link>
                      <Link to="/wishlist" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>
                        ❤️ Wishlist
                      </Link>
                      <hr className="my-1" />
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600">
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link to="/login" className="bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-2 rounded-full hover:from-orange-500 hover:to-orange-600 transition font-semibold shadow-lg">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 max-h-[80vh] overflow-y-auto">
            <Link to="/" className="block py-2 hover:text-orange-400 transition" onClick={() => setIsMenuOpen(false)}>🏠 Home</Link>
            <Link to="/hotels" className="block py-2 hover:text-orange-400 transition" onClick={() => setIsMenuOpen(false)}>🏨 Hotels</Link>
            <Link to="/wishlist" className="block py-2 hover:text-orange-400 transition" onClick={() => setIsMenuOpen(false)}>❤️ Wishlist</Link>
            
            <div className="pt-2">
              <p className="text-orange-400 font-semibold mb-2">📄 Pages</p>
              <Link to="/about" className="block py-1 hover:text-orange-400 transition pl-2" onClick={() => setIsMenuOpen(false)}>📖 About Us</Link>
              <Link to="/contact" className="block py-1 hover:text-orange-400 transition pl-2" onClick={() => setIsMenuOpen(false)}>📞 Contact</Link>
              <Link to="/faq" className="block py-1 hover:text-orange-400 transition pl-2" onClick={() => setIsMenuOpen(false)}>❓ FAQ</Link>
              <Link to="/blog" className="block py-1 hover:text-orange-400 transition pl-2" onClick={() => setIsMenuOpen(false)}>📝 Travel Blog</Link>
              <Link to="/destinations" className="block py-1 hover:text-orange-400 transition pl-2" onClick={() => setIsMenuOpen(false)}>🏙️ Destinations</Link>
              <Link to="/travel-tips" className="block py-1 hover:text-orange-400 transition pl-2" onClick={() => setIsMenuOpen(false)}>💡 Travel Tips</Link>
              <Link to="/hotel-policies" className="block py-1 hover:text-orange-400 transition pl-2" onClick={() => setIsMenuOpen(false)}>📜 Hotel Policies</Link>
              <Link to="/terms" className="block py-1 hover:text-orange-400 transition pl-2" onClick={() => setIsMenuOpen(false)}>⚖️ Terms</Link>
              <Link to="/privacy" className="block py-1 hover:text-orange-400 transition pl-2" onClick={() => setIsMenuOpen(false)}>🔒 Privacy</Link>
            </div>
            
            {isAuthenticated ? (
              <div className="pt-2">
                <p className="text-orange-400 font-semibold mb-2">👤 Account</p>
                <Link to="/bookings" className="block py-1 hover:text-orange-400 transition pl-2" onClick={() => setIsMenuOpen(false)}>📅 My Bookings</Link>
                <Link to="/profile" className="block py-1 hover:text-orange-400 transition pl-2" onClick={() => setIsMenuOpen(false)}>👤 Profile</Link>
                <Link to="/wishlist" className="block py-1 hover:text-orange-400 transition pl-2" onClick={() => setIsMenuOpen(false)}>❤️ Wishlist</Link>
                <button onClick={handleLogout} className="block w-full text-left py-1 hover:text-orange-400 transition pl-2">
                  🚪 Logout
                </button>
              </div>
            ) : (
              <div className="pt-2">
                <Link to="/login" className="block w-full text-center bg-gradient-to-r from-orange-400 to-orange-500 py-2 rounded-lg hover:from-orange-500 hover:to-orange-600 transition font-semibold" onClick={() => setIsMenuOpen(false)}>
                  🔑 Login
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;