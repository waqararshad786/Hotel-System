import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaUsers, FaWifi, FaTv, FaSnowflake, FaCoffee, FaBath, FaParking, FaDumbbell, FaUtensils, FaSwimmer, FaCalendar, FaClock } from 'react-icons/fa';
import { getRoomById } from '../services/roomService';
import { getHotelById } from '../services/hotelService';
import { checkAvailability } from '../services/bookingService';
import toast from 'react-hot-toast';
import Loader from '../components/common/Loader';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [isAvailable, setIsAvailable] = useState(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  useEffect(() => {
    fetchRoomDetails();
  }, [id]);

  const fetchRoomDetails = async () => {
    setLoading(true);
    try {
      const roomRes = await getRoomById(id);
      setRoom(roomRes.data.room);
      
      const hotelRes = await getHotelById(roomRes.data.room.hotel);
      setHotel(hotelRes.data.hotel);
    } catch (error) {
      console.error('Error fetching room details:', error);
      toast.error('Failed to load room details');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckAvailability = async () => {
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    setCheckingAvailability(true);
    try {
      const res = await checkAvailability({ roomId: id, checkIn, checkOut });
      setIsAvailable(res.data.available);
      if (res.data.available) {
        toast.success('Room is available for selected dates!');
      } else {
        toast.error('Room is not available for selected dates');
      }
    } catch (error) {
      toast.error('Failed to check availability');
    } finally {
      setCheckingAvailability(false);
    }
  };

  const handleBookNow = () => {
    if (!isAvailable) {
      toast.error('Please check availability first');
      return;
    }
    navigate('/booking-summary', { state: { room, hotel, checkIn, checkOut, guests } });
  };

  const amenityIcons = {
    'WiFi': <FaWifi />,
    'AC': <FaSnowflake />,
    'TV': <FaTv />,
    'Mini Bar': <FaCoffee />,
    'Bathroom': <FaBath />,
    'Parking': <FaParking />,
    'Gym': <FaDumbbell />,
    'Restaurant': <FaUtensils />,
    'Pool': <FaSwimmer />
  };

  if (loading) return <Loader />;
  if (!room) return <div className="text-center py-12">Room not found</div>;

  const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) : 0;
  const totalPrice = nights * (room?.pricePerNight || 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-blue-900 hover:underline">
          ← Back to Hotel
        </button>
        <Link to="/hotel-policies" className="text-blue-900 hover:underline">
          Hotel Policies
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={room.images?.[0] || 'https://images.unsplash.com/photo-1566665797739-1674de7a421a'}
              alt={room.name}
              className="w-full h-96 object-cover"
            />
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-2">{room.name}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <span className="font-semibold">{hotel?.name}</span>
                <span className="mx-2">•</span>
                <span>{hotel?.city}</span>
              </div>
              
              <p className="text-gray-700 mb-6">{room.description}</p>
              
              <h3 className="font-semibold text-lg mb-3">Room Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {room.amenities?.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    {amenityIcons[amenity] || '✓'} {amenity}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <FaUsers /> Up to {room.capacity} guests
                </div>
                <div>Room: {room.roomNumber}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <div className="text-center mb-4">
              <p className="text-3xl font-bold text-blue-900">PKR {room.pricePerNight?.toLocaleString()}</p>
              <p className="text-gray-500">per night</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Check-in Date</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Check-out Date</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  min={checkIn || new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              {checkIn && checkOut && nights > 0 && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>{nights} nights × PKR {room.pricePerNight?.toLocaleString()}</span>
                    <span>PKR {totalPrice?.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleCheckAvailability}
                disabled={checkingAvailability}
                className="w-full border-2 border-blue-900 text-blue-900 py-2 rounded-lg hover:bg-blue-900 hover:text-white transition"
              >
                {checkingAvailability ? 'Checking...' : 'Check Availability'}
              </button>

              {isAvailable === true && (
                <button
                  onClick={handleBookNow}
                  className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                >
                  Proceed to Book
                </button>
              )}

              {isAvailable === false && (
                <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center">
                  Not available for selected dates
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-lg mb-4">Hotel Policies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Check-in:</strong> 2:00 PM onwards</p>
            <p><strong>Check-out:</strong> 12:00 PM</p>
            <p><strong>Minimum age:</strong> 18 years</p>
          </div>
          <div>
            <p><strong>Cancellation:</strong> Free cancellation up to 24 hours before check-in</p>
            <p><strong>Children:</strong> Children under 6 stay free</p>
            <p><strong>Pets:</strong> Pets not allowed</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <Link to="/hotel-policies" className="text-blue-900 hover:underline">
            View Full Policies →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;