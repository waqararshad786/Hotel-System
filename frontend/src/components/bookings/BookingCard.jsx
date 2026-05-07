import React from 'react';
import { Link } from 'react-router-dom';
import { cancelBooking } from '../../services/bookingService';
import toast from 'react-hot-toast';

const BookingCard = ({ booking, onCancel }) => {
  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking(booking._id);
        toast.success('Booking cancelled successfully');
        onCancel();
      } catch (error) {
        toast.error('Failed to cancel booking');
      }
    }
  };

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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex flex-wrap justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold">
              <Link to={`/hotels/${booking.hotel?._id}`} className="hover:text-blue-900">
                {booking.hotel?.emoji} {booking.hotel?.name}
              </Link>
            </h3>
            <p className="text-gray-500 text-sm">{booking.hotel?.city}</p>
          </div>
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
              {booking.status.toUpperCase()}
            </span>
            <p className="text-xs text-gray-500 mt-1">Booking #{booking.bookingId}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Room</p>
            <p className="font-medium">{booking.room?.name} ({booking.room?.type})</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Dates</p>
            <p className="font-medium">
              {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">{booking.nights} nights</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Guest Details</p>
            <p className="font-medium">{booking.guestName}</p>
            <p className="text-sm">{booking.guestPhone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-xl font-bold text-blue-900">PKR {booking.totalAmount?.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Including taxes</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t">
          <Link to={`/bookings/${booking._id}`} className="border-2 border-blue-900 text-blue-900 px-4 py-2 rounded-lg text-sm hover:bg-blue-900 hover:text-white transition">
            View Details
          </Link>
          {canCancel && (
            <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition">
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;