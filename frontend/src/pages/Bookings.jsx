import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyBookings } from '../services/bookingService';
import Loader from '../components/common/Loader';
import { FaHotel, FaCalendarAlt, FaUsers, FaMoneyBillWave, FaClock, FaMapMarkerAlt, FaStar, FaBed, FaWifi, FaTv, FaSnowflake, FaUtensils, FaCoffee } from 'react-icons/fa';

const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('blob:')) return imagePath;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads')) return `http://localhost:5000${imagePath}`;
    if (imagePath.startsWith('uploads')) return `http://localhost:5000/${imagePath}`;
    return `http://localhost:5000/${imagePath}`;
};

const fallbackImage = 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await getMyBookings();
      setBookings(res.data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmed': return { color: 'bg-green-100 text-green-700', text: 'Confirmed', icon: '✅' };
      case 'pending': return { color: 'bg-yellow-100 text-yellow-700', text: 'Pending', icon: '⏳' };
      case 'cancelled': return { color: 'bg-red-100 text-red-700', text: 'Cancelled', icon: '❌' };
      case 'completed': return { color: 'bg-blue-100 text-blue-700', text: 'Completed', icon: '🎉' };
      default: return { color: 'bg-gray-100 text-gray-700', text: status, icon: '📋' };
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-block bg-blue-100 rounded-full p-3 mb-4">
            <FaHotel className="text-blue-900 text-4xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Bookings</h1>
          <p className="text-gray-500">View and manage all your hotel reservations</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md mx-auto">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Bookings Yet</h3>
            <p className="text-gray-500 mb-6">You haven't made any bookings yet.</p>
            <Link to="/hotels" className="inline-block bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-800 hover:to-blue-600 transition font-semibold">
              Browse Hotels
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const status = getStatusBadge(booking.status);
              const roomImage = booking.room?.images?.[0] || fallbackImage;
              const hotelImage = booking.hotel?.images?.[0] || fallbackImage;
              
              return (
                <div key={booking._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4 flex flex-wrap justify-between items-center">
                    <div>
                      <p className="text-blue-200 text-sm">Booking ID</p>
                      <p className="text-white font-mono font-semibold">{booking.bookingId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-200 text-sm">Booking Date</p>
                      <p className="text-white font-medium">{new Date(booking.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-40 flex-shrink-0">
                        <img 
                          src={getImageUrl(hotelImage)}
                          alt={booking.hotel?.name}
                          className="w-full h-28 object-cover rounded-xl shadow-md"
                          onError={(e) => { e.target.src = fallbackImage; }}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap justify-between items-start mb-3">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-800">{booking.hotel?.name}</h2>
                            <div className="flex items-center gap-2 mt-1">
                              <FaMapMarkerAlt className="text-gray-400 text-sm" />
                              <span className="text-gray-500 text-sm">{booking.hotel?.city}</span>
                              <div className="flex ml-2">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar key={i} className={`w-3 h-3 ${i < (booking.hotel?.stars || 0) ? 'text-yellow-500' : 'text-gray-300'}`} />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className={`${status.color} px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1`}>
                            <span>{status.icon}</span> {status.text}
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                            <FaBed className="text-blue-600" /> Booked Room
                          </p>
                          <div className="flex gap-4">
                            <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              <img 
                                src={getImageUrl(roomImage)}
                                alt={booking.room?.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = fallbackImage; }}
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-800">{booking.room?.name}</h3>
                              <p className="text-sm text-gray-500 capitalize">{booking.room?.type}</p>
                              <div className="flex flex-wrap gap-3 mt-2">
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
                                  <FaUsers size={10} /> {booking.room?.capacity} Guests
                                </span>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
                                  <FaWifi size={10} /> Free WiFi
                                </span>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
                                  <FaSnowflake size={10} /> AC
                                </span>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
                                  <FaTv size={10} /> Smart TV
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Price per night</p>
                              <p className="font-bold text-blue-600">PKR {booking.pricePerNight?.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-50 p-2 rounded-lg">
                          <FaCalendarAlt className="text-orange-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Check In</p>
                          <p className="font-semibold text-gray-800">{new Date(booking.checkIn).toLocaleDateString()}</p>
                          <p className="text-xs text-gray-400">From 2:00 PM</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-50 p-2 rounded-lg">
                          <FaCalendarAlt className="text-orange-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Check Out</p>
                          <p className="font-semibold text-gray-800">{new Date(booking.checkOut).toLocaleDateString()}</p>
                          <p className="text-xs text-gray-400">Until 12:00 PM</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-green-50 p-2 rounded-lg">
                          <FaClock className="text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Duration</p>
                          <p className="font-semibold text-gray-800">{booking.nights} Nights</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-50 p-2 rounded-lg">
                          <FaMoneyBillWave className="text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Total Amount</p>
                          <p className="font-semibold text-lg text-blue-600">PKR {booking.totalAmount?.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <FaUsers className="text-gray-400" />
                          <span className="text-sm text-gray-600">Guest: {booking.guestName}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.paymentStatus === 'paid' ? (
                            <span className="text-green-600">✓ Payment Completed</span>
                          ) : (
                            <span className="text-orange-600">⏳ Payment Pending</span>
                          )}
                        </div>
                      </div>
                      <Link 
                        to={`/bookings/${booking._id}`}
                        className="mt-3 md:mt-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition font-medium"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;