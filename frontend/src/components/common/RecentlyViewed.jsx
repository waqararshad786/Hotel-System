import React from 'react';
import { Link } from 'react-router-dom';
import { useRecentlyViewed } from '../../context/RecentlyViewedContext';
import { FaEye, FaTrash, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

// Image URL helper function
const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('blob:')) return imagePath;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads')) return `http://localhost:5000${imagePath}`;
    if (imagePath.startsWith('uploads')) return `http://localhost:5000/${imagePath}`;
    return `http://localhost:5000/${imagePath}`;
};

const fallbackImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200';

const RecentlyViewed = () => {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaEye className="text-blue-900" /> Recently Viewed Hotels
          </h2>
          <p className="text-gray-500 text-sm">Hotels you've been checking out</p>
        </div>
        <button 
          onClick={() => {
            clearRecentlyViewed();
            toast.success('Cleared recently viewed');
          }} 
          className="text-sm text-red-500 hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow"
        >
          <FaTrash size={12} /> Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {recentlyViewed.map((hotel) => {
          const hotelImage = hotel.images && hotel.images.length > 0 ? hotel.images[0] : null;
          const imageUrl = getImageUrl(hotelImage);
          
          return (
            <Link 
              key={hotel._id} 
              to={`/hotels/${hotel._id}`} 
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-32 overflow-hidden bg-gray-200">
                <img 
                  src={imageUrl || fallbackImage}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  onError={(e) => { e.target.src = fallbackImage; }}
                />
                <div className="absolute top-1 right-1 bg-yellow-500 text-white text-xs px-1 rounded flex items-center gap-0.5">
                  <FaStar size={8} /> {hotel.stars || 0}
                </div>
              </div>
              <div className="p-2">
                <p className="font-semibold text-sm truncate">{hotel.name}</p>
                <p className="text-xs text-gray-500 flex items-center gap-0.5">
                  <FaMapMarkerAlt size={8} /> {hotel.city}
                </p>
                <p className="text-xs text-blue-900 font-semibold mt-1">
                  PKR {hotel.pricePerNight?.toLocaleString() || '0'}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecentlyViewed;