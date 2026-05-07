import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaHotel, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-2 rounded-lg">
                <FaHotel className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold gradient-text">LuxeStay</span>
            </div>
            <p className="text-gray-400 mb-4">
              Pakistan's premier hotel booking platform offering luxury stays at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-orange-500 transition">
                <FaFacebook />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-orange-500 transition">
                <FaTwitter />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-orange-500 transition">
                <FaInstagram />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-orange-500 transition">
                <FaYoutube />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-orange-400">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-orange-400 transition">Home</Link></li>
              <li><Link to="/hotels" className="hover:text-orange-400 transition">Hotels</Link></li>
              <li><Link to="/about" className="hover:text-orange-400 transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-orange-400 transition">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-orange-400 transition">FAQ</Link></li>
              <li><Link to="/blog" className="hover:text-orange-400 transition">Travel Blog</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-orange-400">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/terms" className="hover:text-orange-400 transition">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-orange-400 transition">Privacy Policy</Link></li>
              <li><Link to="/hotel-policies" className="hover:text-orange-400 transition">Hotel Policies</Link></li>
              <li><Link to="/travel-tips" className="hover:text-orange-400 transition">Travel Tips</Link></li>
              <li><Link to="/destinations" className="hover:text-orange-400 transition">Destinations</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-orange-400">Get in Touch</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-orange-400" />
                <span>Lahore, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-orange-400" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-orange-400" />
                <span>info@luxestay.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaClock className="text-orange-400" />
                <span>24/7 Customer Support</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
          <p>© {currentYear} LuxeStay. Made with <FaHeart className="inline text-red-500" /> for Pakistan</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;