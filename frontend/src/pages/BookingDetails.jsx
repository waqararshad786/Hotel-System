import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBookingById, cancelBooking } from '../services/bookingService';
import Loader from '../components/common/Loader';
import toast from 'react-hot-toast';
import { 
  FaCalendar, FaUsers, FaClock, FaMoneyBillWave, FaHotel, 
  FaBed, FaUser, FaEnvelope, FaPhone, FaTimes, FaComment, 
  FaCheckCircle, FaExclamationTriangle, FaBan, FaArrowLeft,
  FaWifi, FaTv, FaSnowflake, FaCoffee, FaParking
} from 'react-icons/fa';

const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('blob:')) return imagePath;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads')) return `http://localhost:5000${imagePath}`;
    if (imagePath.startsWith('uploads')) return `http://localhost:5000/${imagePath}`;
    return `http://localhost:5000/${imagePath}`;
};

const fallbackImage = 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);

  const cancelReasons = [
    'Change of plans',
    'Found better price elsewhere',
    'Emergency',
    'Wrong dates selected',
    'Other'
  ];

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    setLoading(true);
    try {
      const res = await getBookingById(id);
      console.log('Booking details:', res.data);
      setBooking(res.data.booking);
    } catch (error) {
      console.error('Error fetching booking:', error);
      toast.error('Booking not found');
      navigate('/bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelWithReason = async () => {
    if (!cancelReason) {
      toast.error('Please select a reason for cancellation');
      return;
    }
    
    setIsCancelling(true);
    try {
      console.log('Cancelling booking with ID:', booking._id, 'Reason:', cancelReason);
      const response = await cancelBooking(booking._id, cancelReason);
      console.log('Cancel response:', response);
      
      if (response.data.success) {
        toast.success('Booking cancelled successfully!');
        setShowCancelModal(false);
        fetchBooking(); // Refresh booking details
      } else {
        toast.error(response.data.message || 'Failed to cancel');
      }
    } catch (error) {
      console.error('Cancel error:', error);
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    } finally {
      setIsCancelling(false);
    }
  };

  if (loading) return <Loader />;
  if (!booking) return null;

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const canCancel = booking.status !== 'cancelled' && booking.status !== 'completed';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition mb-6"
        >
          <FaArrowLeft /> Back
        </button>
        
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6">
            <div className="flex justify-between items-center flex-wrap gap-3">
              <div>
                <h1 className="text-2xl font-bold">Booking Details</h1>
                <p className="text-blue-200 text-sm mt-1">Booking ID: {booking.bookingId}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(booking.status)} bg-opacity-20 backdrop-blur-sm`}>
                {booking.status.toUpperCase()}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            {/* Hotel & Room Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Hotel Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FaHotel className="text-blue-600" /> Hotel Information
                </h2>
                <div className="flex gap-4">
                  <img 
                    src={getImageUrl(booking.hotel?.images?.[0]) || fallbackImage} 
                    alt={booking.hotel?.name} 
                    className="w-24 h-24 object-cover rounded-lg"
                    onError={(e) => { e.target.src = fallbackImage; }} 
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{booking.hotel?.name}</p>
                    <p className="text-sm text-gray-600">{booking.hotel?.city}</p>
                    <p className="text-xs text-gray-500 mt-1">{booking.hotel?.address}</p>
                  </div>
                </div>
              </div>
              
              {/* Room Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FaBed className="text-blue-600" /> Room Information
                </h2>
                <div className="flex gap-4">
                  <img 
                    src={getImageUrl(booking.room?.images?.[0]) || fallbackImage} 
                    alt={booking.room?.name} 
                    className="w-24 h-24 object-cover rounded-lg"
                    onError={(e) => { e.target.src = fallbackImage; }} 
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{booking.room?.name}</p>
                    <p className="text-sm text-gray-600 capitalize">{booking.room?.type}</p>
                    <p className="text-sm font-semibold text-blue-600 mt-1">
                      PKR {booking.pricePerNight?.toLocaleString()} <span className="text-xs text-gray-500">/night</span>
                    </p>
                  </div>
                </div>
                {/* Room Amenities */}
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200">
                  <span className="text-xs bg-white px-2 py-1 rounded-full flex items-center gap-1">
                    <FaUsers size={10} /> {booking.room?.capacity} Guests
                  </span>
                  <span className="text-xs bg-white px-2 py-1 rounded-full flex items-center gap-1">
                    <FaWifi size={10} /> WiFi
                  </span>
                  <span className="text-xs bg-white px-2 py-1 rounded-full flex items-center gap-1">
                    <FaSnowflake size={10} /> AC
                  </span>
                  <span className="text-xs bg-white px-2 py-1 rounded-full flex items-center gap-1">
                    <FaTv size={10} /> TV
                  </span>
                </div>
              </div>
            </div>
            
            {/* Guest & Booking Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Guest Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FaUser className="text-blue-600" /> Guest Information
                </h2>
                <div className="space-y-2">
                  <p><strong>Name:</strong> {booking.guestName}</p>
                  <p><strong>Phone:</strong> {booking.guestPhone}</p>
                  <p><strong>Email:</strong> {booking.guestEmail}</p>
                </div>
              </div>
              
              {/* Booking Dates */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FaCalendar className="text-blue-600" /> Stay Details
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Check In</p>
                    <p className="font-semibold">{new Date(booking.checkIn).toLocaleDateString()}</p>
                    <p className="text-xs text-green-600">From 2:00 PM</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Check Out</p>
                    <p className="font-semibold">{new Date(booking.checkOut).toLocaleDateString()}</p>
                    <p className="text-xs text-red-600">Until 12:00 PM</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Nights</p>
                    <p className="font-semibold">{booking.nights} Nights</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Booked On</p>
                    <p className="font-semibold">{new Date(booking.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <FaMoneyBillWave className="text-blue-600" /> Payment Summary
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between py-1">
                  <span>Room Charges ({booking.nights} nights × PKR {booking.pricePerNight?.toLocaleString()})</span>
                  <span>PKR {booking.subtotal?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Taxes & Fees (16%)</span>
                  <span>PKR {booking.taxes?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200 mt-2 pt-2 font-bold">
                  <span>Total Amount</span>
                  <span className="text-xl text-blue-600">PKR {booking.totalAmount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Payment Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {booking.paymentStatus?.toUpperCase() || 'UNPAID'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Special Requests */}
            {booking.specialRequests && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h2 className="font-semibold text-lg mb-2">Special Requests</h2>
                <p className="text-gray-700">{booking.specialRequests}</p>
              </div>
            )}
            
            {/* ✅ Cancellation Details - Shows if booking is cancelled */}
            {booking.status === 'cancelled' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="bg-red-100 p-2 rounded-full">
                    <FaBan className="text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-800">Booking Cancelled</h3>
                    <p className="text-sm text-red-700 mt-1">
                      <strong>Reason:</strong> {booking.cancellationReason || 'No reason provided'}
                    </p>
                    <p className="text-xs text-red-600 mt-2">
                      Cancelled on: {new Date(booking.cancelledAt).toLocaleString()}
                    </p>
                    <div className="mt-3 bg-red-100 p-2 rounded-lg">
                      <p className="text-xs text-red-700">
                        💰 Refund will be processed within 5-7 business days as per cancellation policy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Cancel Button */}
            {canCancel && (
              <div className="border-t border-gray-200 pt-6">
                <button 
                  onClick={() => setShowCancelModal(true)} 
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg transition flex items-center gap-2 font-medium"
                >
                  <FaTimes /> Cancel Booking
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Free cancellation available up to 24 hours before check-in
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-xl font-bold">Cancel Booking</h3>
              <button onClick={() => setShowCancelModal(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>
            
            <div className="p-5">
              <p className="text-gray-600 mb-4">
                Are you sure you want to cancel booking <strong className="text-blue-600">#{booking.bookingId}</strong>?
              </p>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 flex items-center gap-2">
                  <FaComment /> Reason for cancellation <span className="text-red-500">*</span>
                </label>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a reason</option>
                  {cancelReasons.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-yellow-800">
                  <FaCheckCircle className="inline mr-1" /> 
                  Refund will be processed within 5-7 business days as per cancellation policy.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleCancelWithReason}
                  disabled={isCancelling}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition disabled:opacity-50 font-medium"
                >
                  {isCancelling ? 'Cancelling...' : 'Confirm Cancellation'}
                </button>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  Keep Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;