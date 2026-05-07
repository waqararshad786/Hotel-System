import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllBookings, updateBookingStatus, updatePaymentStatus, deleteBooking, adminCancelBooking } from '../../services/adminService';
import { FaEye, FaTimes, FaCheck, FaClock, FaBan, FaTrash, FaEnvelope } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const cancelReasons = [
    'Customer requested cancellation',
    'Payment issue',
    'Hotel unavailable',
    'Technical error',
    'Other'
  ];

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = statusFilter ? { status: statusFilter } : {};
      const res = await getAllBookings(params);
      setBookings(res.data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      toast.success('Booking status updated');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handlePaymentUpdate = async (id, paymentStatus) => {
    try {
      await updatePaymentStatus(id, paymentStatus);
      toast.success('Payment status updated');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to update payment status');
    }
  };

  const handleAdminCancel = async () => {
    if (!cancelReason) {
      toast.error('Please select a cancellation reason');
      return;
    }

    try {
      const response = await adminCancelBooking(selectedBooking._id, cancelReason);
      toast.success(response.data.message || 'Booking cancelled and email sent to customer');
      setShowCancelModal(false);
      setCancelReason('');
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const handleDeleteBooking = async (id, bookingId) => {
    if (window.confirm(`Are you sure you want to delete booking ${bookingId}? This action cannot be undone.`)) {
      try {
        await deleteBooking(id);
        toast.success('Booking deleted successfully');
        fetchBookings();
      } catch (error) {
        toast.error('Failed to delete booking');
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

  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const openDetailsModal = (booking) => {
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };

  if (loading) return <AdminLayout><div className="p-6">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Bookings</h1>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Booking ID</th>
                  <th className="px-4 py-3 text-left">Guest</th>
                  <th className="px-4 py-3 text-left">Hotel</th>
                  <th className="px-4 py-3 text-left">Room</th>
                  <th className="px-4 py-3 text-left">Dates</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Payment</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{booking.bookingId}</td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{booking.user?.name || booking.guestName}</p>
                        <p className="text-xs text-gray-500">{booking.user?.email || booking.guestEmail}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">{booking.hotel?.name}</td>
                    <td className="px-4 py-3">{booking.room?.name}</td>
                    <td className="px-4 py-3 text-sm">
                      <div>{new Date(booking.checkIn).toLocaleDateString()}</div>
                      <div className="text-gray-500">to</div>
                      <div>{new Date(booking.checkOut).toLocaleDateString()}</div>
                    </td>
                    <td className="px-4 py-3">PKR {booking.totalAmount?.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {booking.status === 'cancelled' ? (
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      ) : (
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                          className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)} border-0 cursor-pointer`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={booking.paymentStatus}
                        onChange={(e) => handlePaymentUpdate(booking._id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-xs ${
                          booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        } border-0 cursor-pointer`}
                      >
                        <option value="unpaid">Unpaid</option>
                        <option value="paid">Paid</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openDetailsModal(booking)}
                          className="text-blue-600 hover:text-blue-800"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        {booking.status !== 'cancelled' && (
                          <button
                            onClick={() => openCancelModal(booking)}
                            className="text-orange-600 hover:text-orange-800"
                            title="Cancel Booking (Send Email)"
                          >
                            <FaBan />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteBooking(booking._id, booking.bookingId)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete Booking"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Cancel Booking Modal with Email */}
        {showCancelModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Cancel Booking</h3>
                <button onClick={() => setShowCancelModal(false)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>
              
              <p className="text-gray-600 mb-4">
                Are you sure you want to cancel booking <strong>#{selectedBooking.bookingId}</strong>?
                <br />
                <span className="text-sm text-blue-600">Customer will receive an email notification.</span>
              </p>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 flex items-center gap-2">
                  <FaEnvelope /> Cancellation Reason <span className="text-red-500">*</span>
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
              
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-blue-800 flex items-center gap-2">
                  <FaEnvelope /> Customer will receive cancellation email with this reason.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleAdminCancel}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                >
                  Cancel Booking & Send Email
                </button>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Booking Details Modal */}
        {showDetailModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Booking Details</h2>
                <button onClick={() => setShowDetailModal(false)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                  <div>
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <p className="font-semibold">{selectedBooking.bookingId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(selectedBooking.status)}`}>
                      {selectedBooking.status}
                    </p>
                  </div>
                </div>
                
                {/* Guest Info */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Guest Information</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p><strong>Name:</strong> {selectedBooking.guestName}</p>
                    <p><strong>Phone:</strong> {selectedBooking.guestPhone}</p>
                    <p><strong>Email:</strong> {selectedBooking.guestEmail}</p>
                  </div>
                </div>
                
                {/* Hotel & Room Info */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Hotel & Room</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p><strong>Hotel:</strong> {selectedBooking.hotel?.name}</p>
                    <p><strong>City:</strong> {selectedBooking.hotel?.city}</p>
                    <p><strong>Room:</strong> {selectedBooking.room?.name} ({selectedBooking.room?.type})</p>
                  </div>
                </div>
                
                {/* Booking Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Check In</p>
                    <p className="font-semibold">{new Date(selectedBooking.checkIn).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Check Out</p>
                    <p className="font-semibold">{new Date(selectedBooking.checkOut).toLocaleDateString()}</p>
                  </div>
                </div>
                
                {/* Price Breakdown */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Price Breakdown</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between py-1">
                      <span>Room ({selectedBooking.nights} nights)</span>
                      <span>PKR {selectedBooking.subtotal?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Taxes (16%)</span>
                      <span>PKR {selectedBooking.taxes?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1 border-t mt-1 pt-1 font-bold">
                      <span>Total Amount</span>
                      <span className="text-blue-600">PKR {selectedBooking.totalAmount?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Cancellation Details */}
                {selectedBooking.status === 'cancelled' && selectedBooking.cancellationReason && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-800 mb-2">Cancellation Details</h3>
                    <p className="text-sm text-red-700"><strong>Reason:</strong> {selectedBooking.cancellationReason}</p>
                    <p className="text-xs text-red-600 mt-2">Cancelled on: {new Date(selectedBooking.cancelledAt).toLocaleString()}</p>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => setShowDetailModal(false)}
                className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition mt-6"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageBookings;