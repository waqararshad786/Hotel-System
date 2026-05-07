import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChartLine, FaBookmark, FaHotel, FaBed, FaUsers, FaSignOutAlt, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: '/admin', name: 'Dashboard', icon: <FaChartLine /> },
    { path: '/admin/bookings', name: 'Bookings', icon: <FaBookmark /> },
    { path: '/admin/hotels', name: 'Hotels', icon: <FaHotel /> },
    { path: '/admin/rooms', name: 'Rooms', icon: <FaBed /> },
    { path: '/admin/users', name: 'Users', icon: <FaUsers /> },
    { path: '/admin/contacts', name: 'Messages', icon: <FaEnvelope /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col fixed h-full shadow-xl">
      <div className="p-4 border-b border-blue-700">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <p className="text-sm text-blue-300">LuxeStay Management</p>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive(item.path)
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'hover:bg-blue-700'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-blue-700">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-600 transition text-left"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;