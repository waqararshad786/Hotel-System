import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaCheckCircle, FaDownload, FaPrint, FaEnvelope, FaHome, FaBookmark } from 'react-icons/fa';
import toast from 'react-hot-toast';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, guestDetails, nights, subtotal, tax, total } = location.state || {};
  const invoiceRef = useRef();

  useEffect(() => {
    if (!booking) {
      navigate('/');
    }
  }, [booking, navigate]);

  const downloadInvoice = () => {
    toast.success('Invoice download started');
    // PDF download functionality
  };

  const printInvoice = () => {
    window.print();
  };

  const emailInvoice = () => {
    toast.success('Invoice sent to your email');
  };

  if (!booking) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600">Your booking has been successfully confirmed.</p>
        <p className="text-blue-900 font-semibold mt-2">Booking ID: {booking.bookingId}</p>
      </div>

      <div ref={invoiceRef} className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
        <div className="text-center mb-8 pb-4 border-b">
          <h2 className="text-2xl font-bold text-blue-900">LuxeStay Booking Invoice</h2>
          <p className="text-gray-600">Booking ID: {booking.bookingId}</p>
          <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-2">Guest Information</h3>
            <p><strong>Name:</strong> {guestDetails?.name || booking.guestName}</p>
            <p><strong>Email:</strong> {guestDetails?.email || booking.guestEmail}</p>
            <p><strong>Phone:</strong> {guestDetails?.phone || booking.guestPhone}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Hotel Information</h3>
            <p><strong>Hotel:</strong> {booking.hotel?.name}</p>
            <p><strong>City:</strong> {booking.hotel?.city}</p>
            <p><strong>Address:</strong> {booking.hotel?.address}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-2">Booking Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Room:</strong> {booking.room?.name}</p>
            <p><strong>Room Type:</strong> {booking.room?.type}</p>
            <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
            <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
            <p><strong>Nights:</strong> {booking.nights}</p>
            <p><strong>Status:</strong> <span className="text-green-600">{booking.status}</span></p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Price Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Room ({booking.nights} nights × PKR {booking.pricePerNight?.toLocaleString()})</span>
              <span>PKR {booking.subtotal?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & Fees (16%)</span>
              <span>PKR {booking.taxes?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-2 border-t font-bold text-lg">
              <span>Total Amount</span>
              <span className="text-blue-900">PKR {booking.totalAmount?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {booking.specialRequests && (
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <p><strong>Special Requests:</strong> {booking.specialRequests}</p>
          </div>
        )}

        <div className="text-center mt-8 pt-4 border-t text-sm text-gray-500">
          <p>Thank you for booking with LuxeStay!</p>
          <p>For any queries, contact us at support@luxestay.com or call +92 300 1234567</p>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={downloadInvoice}
          className="flex items-center gap-2 bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
        >
          <FaDownload /> Download Invoice
        </button>
        <button
          onClick={printInvoice}
          className="flex items-center gap-2 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          <FaPrint /> Print
        </button>
        <button
          onClick={emailInvoice}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <FaEnvelope /> Email
        </button>
        <Link
          to="/bookings"
          className="flex items-center gap-2 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          <FaBookmark /> My Bookings
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 border-2 border-blue-900 text-blue-900 px-6 py-2 rounded-lg hover:bg-blue-900 hover:text-white transition"
        >
          <FaHome /> Home
        </Link>
      </div>
    </div>
  );
};

export default BookingSuccess;