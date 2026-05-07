import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaCalendar, FaUsers, FaClock, FaCreditCard, FaShieldAlt, FaUniversity, FaMoneyBillWave } from 'react-icons/fa';
import { createBooking } from '../services/bookingService';
import toast from 'react-hot-toast';
import Loader from '../components/common/Loader';

const BookingSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { room, hotel, checkIn, checkOut, guests } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
  const subtotal = room?.pricePerNight * nights;
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  const [guestDetails, setGuestDetails] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const handleInputChange = (e) => {
    setGuestDetails({ ...guestDetails, [e.target.name]: e.target.value });
  };

  // ✅ Updated - Redirect to home page after booking
  const handleConfirmBooking = async () => {
    if (!guestDetails.name || !guestDetails.email || !guestDetails.phone) {
      toast.error('Please fill all guest details');
      return;
    }

    setLoading(true);
    try {
      const bookingData = {
        hotelId: hotel?._id,
        roomId: room?._id,
        checkIn,
        checkOut,
        guestName: guestDetails.name,
        guestEmail: guestDetails.email,
        guestPhone: guestDetails.phone,
        specialRequests: guestDetails.specialRequests
      };

      const res = await createBooking(bookingData);
      
      if (res.data.success) {
        toast.success('Booking confirmed successfully!');
        // ✅ Redirect to home page
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (!room || !hotel) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-600 mb-4">No booking information found</p>
        <Link to="/hotels" className="bg-blue-900 text-white px-4 py-2 rounded-lg">Browse Hotels</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-2">Booking Summary</h1>
      <p className="text-gray-600 mb-8">Review your booking details before confirming</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Hotel Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Hotel & Room Details</h2>
            <div className="flex gap-4 mb-4">
              <img 
                src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945'}
                alt={hotel.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-lg">{hotel.name}</h3>
                <p className="text-gray-600">{hotel.city}, {hotel.address}</p>
                <p className="text-gray-600 mt-1">Room: {room.name} ({room.type})</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center gap-2 text-gray-600">
                <FaCalendar /> {new Date(checkIn).toLocaleDateString()} - {new Date(checkOut).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaUsers /> {guests} Guests
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaClock /> {nights} Nights
              </div>
            </div>
          </div>

          {/* Guest Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Guest Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={guestDetails.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  placeholder="Enter guest name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={guestDetails.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    placeholder="guest@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={guestDetails.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    placeholder="03XXXXXXXXX"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Special Requests (Optional)</label>
                <textarea
                  name="specialRequests"
                  value={guestDetails.specialRequests}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  placeholder="Any special requirements?"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Price Summary</h2>
            
            <div className="space-y-2 pb-4 border-b">
              <div className="flex justify-between">
                <span>Room ({nights} nights × PKR {room.pricePerNight?.toLocaleString()})</span>
                <span>PKR {subtotal?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Fees (16%)</span>
                <span>PKR {Math.round(tax)?.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex justify-between pt-4 pb-6 font-bold text-lg">
              <span>Total Amount</span>
              <span className="text-blue-900">PKR {Math.round(total)?.toLocaleString()}</span>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FaCreditCard /> Payment Method
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <FaCreditCard /> Credit/Debit Card
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <FaUniversity /> Bank Transfer
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <FaMoneyBillWave /> Cash on Arrival
                </label>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 p-3 rounded-lg flex items-center gap-2 text-sm text-gray-600">
              <FaShieldAlt className="text-blue-900" />
              Your booking is secure and protected
            </div>

            <button
              onClick={handleConfirmBooking}
              disabled={loading}
              className="w-full bg-orange-500 text-white py-3 rounded-lg mt-6 hover:bg-orange-600 transition font-semibold"
            >
              {loading ? <Loader /> : 'Confirm Booking'}
            </button>

            <Link to={`/room/${room?._id}`} className="w-full block text-center text-gray-600 mt-3 hover:text-blue-900">
              ← Back to Room
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;