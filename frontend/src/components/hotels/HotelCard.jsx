import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaWifi, FaSwimmer, FaUtensils, FaDumbbell, FaHeart, FaRegHeart, FaClock, FaBed } from 'react-icons/fa';
import { useWishlist } from '../../context/WishlistContext';

// Image URL helper function
const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('blob:')) return imagePath;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads')) return `http://localhost:5000${imagePath}`;
    if (imagePath.startsWith('uploads')) return `http://localhost:5000/${imagePath}`;
    return `http://localhost:5000/${imagePath}`;
};

// Fallback image
const fallbackImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500';

const HotelCard = ({ hotel }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isFav = isInWishlist(hotel._id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFav) {
      removeFromWishlist(hotel._id);
    } else {
      addToWishlist(hotel);
    }
  };

  // Get hotel image
  const hotelImage = hotel.images && hotel.images.length > 0 ? hotel.images[0] : null;
  const imageUrl = getImageUrl(hotelImage);

  const remainingRooms = hotel.availableRooms || Math.floor(Math.random() * 10) + 1;
  const isLowAvailability = remainingRooms <= 3;

  // Get price - from hotel.pricePerNight or default
  const displayPrice = hotel.pricePerNight || 0;

  if (!hotel || !hotel._id) return null;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in">
      <div className="relative overflow-hidden h-64">
        <img 
          src={imageUrl || fallbackImage}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          onError={(e) => { 
            console.log('Image failed to load:', imageUrl);
            e.target.src = fallbackImage; 
          }}
        />
        <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          {hotel.emoji || '🏨'} {hotel.stars}★
        </div>
        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition duration-300 z-10"
        >
          {isFav ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-gray-500 text-xl hover:text-red-500" />
          )}
        </button>
        
        {/* Price Tag - Fixed Position */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-3 py-1 rounded-full inline-block text-white font-bold text-sm">
            PKR {displayPrice.toLocaleString()} <span className="text-xs">/night</span>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-blue-900 transition">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">
            <FaStar className="text-yellow-500" />
            <span className="font-semibold text-sm">{hotel.rating?.toFixed(1) || '0'}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 mb-3">
          <FaMapMarkerAlt className="mr-1 text-sm" />
          <span className="text-sm">{hotel.city}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{hotel.description || 'No description available'}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities?.slice(0, 3).map((amenity, index) => {
            let icon = null;
            if (amenity === 'WiFi') icon = <FaWifi />;
            else if (amenity === 'Swimming Pool') icon = <FaSwimmer />;
            else if (amenity === 'Restaurant') icon = <FaUtensils />;
            else if (amenity === 'Gym') icon = <FaDumbbell />;
            else icon = <FaBed />;
            
            return (
              <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
                {icon} {amenity}
              </span>
            );
          })}
        </div>
        
        {isLowAvailability && (
          <div className="mb-3 flex items-center gap-1 text-red-500 text-sm">
            <FaClock /> Only {remainingRooms} rooms left!
          </div>
        )}
        
        <Link 
          to={`/hotels/${hotel._id}`} 
          className="block w-full bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2.5 rounded-xl text-center font-semibold hover:from-blue-800 hover:to-blue-700 transition shadow-md"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default HotelCard;