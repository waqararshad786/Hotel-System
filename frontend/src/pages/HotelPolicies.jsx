import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaClock, FaCalendarAlt, FaMoneyBillWave, FaShieldAlt, 
  FaChild, FaPaw, FaCar, FaCreditCard, FaSmoking, 
  FaWifi, FaUtensils, FaSwimmer, FaDumbbell,
  FaCheckCircle, FaEnvelope, FaPhone, FaMapMarkerAlt
} from 'react-icons/fa';

const HotelPolicies = () => {
  const policies = [
    {
      icon: <FaClock className="text-2xl text-blue-600" />,
      title: 'Check-in / Check-out',
      color: 'bg-blue-50',
      rules: [
        'Check-in: 2:00 PM onwards',
        'Check-out: 12:00 PM',
        'Early check-in subject to availability',
        'Late check-out may incur additional charges',
        '24-hour front desk service available'
      ]
    },
    {
      icon: <FaCalendarAlt className="text-2xl text-orange-600" />,
      title: 'Cancellation Policy',
      color: 'bg-orange-50',
      rules: [
        'Free cancellation up to 24 hours before check-in',
        '50% charge for cancellation within 24 hours',
        '100% charge for no-show',
        'Non-refundable bookings cannot be cancelled',
        'Refunds processed within 5-7 business days'
      ]
    },
    {
      icon: <FaCreditCard className="text-2xl text-green-600" />,
      title: 'Payment Policy',
      color: 'bg-green-50',
      rules: [
        'Full payment required at check-in',
        'Credit cards (Visa, MasterCard, Amex) accepted',
        'Debit cards and cash accepted',
        'Security deposit of PKR 5000 required',
        'Taxes (16% GST) included in room rate'
      ]
    },
    {
      icon: <FaShieldAlt className="text-2xl text-purple-600" />,
      title: 'House Rules',
      color: 'bg-purple-50',
      rules: [
        'No smoking in rooms (fine PKR 5000)',
        'Quiet hours: 10 PM - 8 AM',
        'No parties or events allowed',
        'Registered guests only',
        'Visitors not allowed after 10 PM'
      ]
    },
    {
      icon: <FaChild className="text-2xl text-pink-600" />,
      title: 'Children & Extra Beds',
      color: 'bg-pink-50',
      rules: [
        'Children under 6 stay free',
        'Extra bed available for PKR 1000/night',
        'Baby cot available on request (free)',
        'Children must be supervised at all times',
        'Kids menu available in restaurant'
      ]
    },
    {
      icon: <FaPaw className="text-2xl text-yellow-600" />,
      title: 'Pet Policy',
      color: 'bg-yellow-50',
      rules: [
        'Pets not allowed in standard rooms',
        'Service animals welcome with documentation',
        'Pet-friendly rooms available on request',
        'Pet cleaning fee of PKR 3000 applies',
        'Pets must be leashed in public areas'
      ]
    },
    {
      icon: <FaCar className="text-2xl text-teal-600" />,
      title: 'Parking & Transport',
      color: 'bg-teal-50',
      rules: [
        'Free parking for guests',
        'Valet service available (PKR 500/day)',
        'Airport shuttle available (PKR 1500 one way)',
        'EV charging station available',
        'Bike rental available'
      ]
    }
  ];

  const amenities = [
    { icon: <FaWifi />, name: 'Free WiFi', available: true },
    { icon: <FaSwimmer />, name: 'Swimming Pool', available: true },
    { icon: <FaUtensils />, name: 'Restaurant', available: true },
    { icon: <FaDumbbell />, name: 'Fitness Center', available: true },
    { icon: <FaSmoking />, name: 'Smoking Area', available: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 rounded-full p-3 mb-3">
            <FaShieldAlt className="text-blue-900 text-4xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Hotel <span className="text-blue-900">Policies</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Important information for your stay. Please read carefully before booking.
          </p>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {policies.map((policy, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden">
              <div className={`${policy.color} p-3 flex items-center gap-2`}>
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  {policy.icon}
                </div>
                <h2 className="text-lg font-semibold text-gray-800">{policy.title}</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {policy.rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <FaCheckCircle className="text-green-500 text-sm mt-0.5 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Amenities Section */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-8">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Hotel Amenities</h2>
            <p className="text-gray-500 text-sm">What's available during your stay</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {amenities.map((item, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className={`text-2xl mb-1 ${item.available ? 'text-blue-600' : 'text-gray-400'}`}>
                  {item.icon}
                </div>
                <p className={`text-sm font-medium ${item.available ? 'text-gray-700' : 'text-gray-400'}`}>
                  {item.name}
                </p>
                {!item.available && (
                  <span className="text-xs text-red-500">(Not Available)</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 mb-8">
          <div className="flex gap-3">
            <div className="text-2xl">⚠️</div>
            <div>
              <h3 className="font-semibold text-yellow-800">Important Note</h3>
              <p className="text-sm text-yellow-700">
                Policies may vary by hotel. Please check the specific policies of your chosen hotel before booking.
                For any questions, contact our customer support team.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-100 rounded-lg p-5 mb-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Need Assistance?</h2>
            <p className="text-gray-500 text-sm">Our support team is here to help</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Link to="/contact" className="flex items-center justify-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition">
              <FaEnvelope className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Email Us</p>
                <p className="text-sm font-semibold">support@luxestay.com</p>
              </div>
            </Link>
            <Link to="/contact" className="flex items-center justify-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition">
              <FaPhone className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Call Us</p>
                <p className="text-sm font-semibold">+92 300 1234567</p>
              </div>
            </Link>
            <Link to="/contact" className="flex items-center justify-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition">
              <FaMapMarkerAlt className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Visit Us</p>
                <p className="text-sm font-semibold">Lahore, Pakistan</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
            ← Back to Home
          </Link>
          <Link to="/contact" className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition text-sm font-medium">
            Contact Support
          </Link>
          <Link to="/faq" className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
            FAQ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelPolicies;