import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { FaHeart, FaTrash, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('blob:')) return imagePath;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads')) return `http://localhost:5000${imagePath}`;
    if (imagePath.startsWith('uploads')) return `http://localhost:5000/${imagePath}`;
    return `http://localhost:5000/${imagePath}`;
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400';

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-6">Save your favorite hotels here</p>
        <Link to="/hotels" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
          Browse Hotels
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">My Wishlist</h1>
      <p className="text-gray-500 mb-8">{wishlist.length} hotels saved</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((hotel) => (
          <div key={hotel._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="relative h-52 overflow-hidden">
              <img 
                src={getImageUrl(hotel.images?.[0]) || fallbackImage}
                alt={hotel.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                onError={(e) => { e.target.src = fallbackImage; }}
              />
              <button
                onClick={() => removeFromWishlist(hotel._id)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition"
              >
                <FaTrash className="text-red-500" />
              </button>
              <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                {hotel.stars} ★
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">{hotel.name}</h3>
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  <FaStar className="text-yellow-500 text-sm" />
                  <span className="text-sm font-semibold">{hotel.rating || 4.5}</span>
                </div>
              </div>
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <FaMapMarkerAlt className="mr-1" />
                {hotel.city}, Pakistan
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{hotel.description || 'No description available'}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">PKR {hotel.pricePerNight?.toLocaleString() || '8,000'}</span>
                <span className="text-sm text-gray-500">/night</span>
              </div>
              <Link 
                to={`/hotels/${hotel._id}`}
                className="block w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;