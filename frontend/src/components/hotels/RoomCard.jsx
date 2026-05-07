import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaWifi, FaTv, FaSnowflake, FaCoffee, FaClock, FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const RoomCard = ({ room, hotelId, hotelName }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showBooking, setShowBooking] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Get tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast.error('Please login first to book a room');
      navigate('/login');
      return;
    }
    setShowBooking(true);
    // Set default dates
    if (!checkIn) setCheckIn(today);
    if (!checkOut) setCheckOut(tomorrowStr);
  };

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  };

  const nights = calculateNights();
  const totalPrice = nights * (room?.pricePerNight || 0);

  const handleProceedToBooking = () => {
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }
    if (new Date(checkIn) >= new Date(checkOut)) {
      toast.error('Check-out date must be after check-in date');
      return;
    }
    if (!guestName || !guestPhone || !guestEmail) {
      toast.error('Please fill all guest details');
      return;
    }

    navigate('/booking-summary', { 
      state: { 
        room, 
        hotelId, 
        hotelName,
        checkIn, 
        checkOut, 
        guests: 2,
        guestDetails: { name: guestName, phone: guestPhone, email: guestEmail }
      } 
    });
  };

  const amenityIcons = {
    'WiFi': <FaWifi />,
    'AC': <FaSnowflake />,
    'TV': <FaTv />,
    'Mini Bar': <FaCoffee />
  };

  // Random remaining rooms (1-5)
  const remainingRooms = Math.floor(Math.random() * 5) + 1;
  const isLowAvailability = remainingRooms <= 3;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex flex-wrap justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold">{room.name}</h3>
            <p className="text-gray-500 text-sm">Room {room.roomNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-900">PKR {room.pricePerNight?.toLocaleString()}</p>
            <p className="text-gray-500 text-sm">per night</p>
            {isLowAvailability && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <FaClock /> Only {remainingRooms} rooms left!
              </p>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{room.description}</p>
        
        <div className="flex items-center gap-2 mb-4">
          <FaUsers className="text-gray-500" />
          <span className="text-sm">Sleeps {room.capacity}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {room.amenities?.slice(0, 4).map((amenity, index) => (
            <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
              {amenityIcons[amenity] || '✓'} {amenity}
            </span>
          ))}
        </div>
        
        {!showBooking ? (
          <button onClick={handleBookNow} className="bg-blue-900 text-white py-2 rounded-lg w-full hover:bg-blue-800 transition">
            Book Now
          </button>
        ) : (
          <div className="space-y-3">
            {/* Check-in/out */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <FaClock size={10} /> Check-in (2PM)
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={today}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <FaClock size={10} /> Check-out (12PM)
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || today}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                />
              </div>
            </div>
            
            {/* Nights and total */}
            {nights > 0 && (
              <div className="bg-blue-50 p-2 rounded-lg text-center text-sm">
                <span className="font-semibold">{nights} nights</span> = PKR {totalPrice.toLocaleString()}
              </div>
            )}
            
            {/* Guest Details */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Guest Name</label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="03XXXXXXXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                />
              </div>
            </div>
            
            <div className="flex gap-3 pt-2">
              <button 
                onClick={handleProceedToBooking} 
                disabled={loading}
                className="bg-orange-500 text-white flex-1 text-sm py-2 rounded-lg hover:bg-orange-600 transition"
              >
                {loading ? 'Processing...' : 'Proceed to Pay'}
              </button>
              <button 
                onClick={() => setShowBooking(false)} 
                className="border-2 border-gray-300 text-gray-600 text-sm py-2 rounded-lg hover:bg-gray-100 transition px-4"
              >
                Cancel
              </button>
            </div>
            
            <div className="text-xs text-gray-500 text-center">
              <FaCheckCircle className="inline mr-1 text-green-500" />
              Free cancellation up to 24 hours before check-in
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomCard;