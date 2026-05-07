import React from 'react';
import { Link } from 'react-router-dom';
import { FaGavel, FaFileContract, FaUserCheck, FaCreditCard, FaCalendarAlt, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';

const Terms = () => {
  const sections = [
    {
      icon: <FaGavel className="text-2xl text-blue-600" />,
      title: '1. Acceptance of Terms',
      content: 'By accessing and using LuxeStay\'s services, you agree to be bound by these Terms & Conditions.'
    },
    {
      icon: <FaFileContract className="text-2xl text-blue-600" />,
      title: '2. Booking and Payment',
      content: 'All bookings made through LuxeStay are subject to availability. Payments are processed securely through our payment partners.'
    },
    {
      icon: <FaCalendarAlt className="text-2xl text-blue-600" />,
      title: '3. Cancellation Policy',
      content: 'Cancellation policies vary by hotel. Please review the policy before confirming your booking.'
    },
    {
      icon: <FaUserCheck className="text-2xl text-blue-600" />,
      title: '4. User Accounts',
      content: 'You are responsible for maintaining the confidentiality of your account credentials.'
    },
    {
      icon: <FaShieldAlt className="text-2xl text-blue-600" />,
      title: '5. Privacy Policy',
      content: 'Your privacy is important to us. Please review our Privacy Policy for more information.'
    },
    {
      icon: <FaCreditCard className="text-2xl text-blue-600" />,
      title: '6. Payment Terms',
      content: 'Full payment is required at the time of booking. All prices are in PKR including taxes.'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 rounded-full p-3 mb-3">
            <FaGavel className="text-blue-900 text-4xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Terms & <span className="text-blue-900">Conditions</span>
          </h1>
          <p className="text-gray-600">Please read these terms carefully before using our services</p>
          <div className="mt-2 inline-block bg-gray-100 rounded-full px-3 py-0.5">
            <p className="text-xs text-gray-500">Last updated: January 2025</p>
          </div>
        </div>

        {/* Agreement Card */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl p-5 mb-8 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-green-400 text-xl" />
            <h2 className="text-xl font-bold">Agreement to Terms</h2>
          </div>
          <p className="text-blue-100 text-sm leading-relaxed">
            By accessing or using LuxeStay's services, you agree to be bound by these Terms and Conditions and our Privacy Policy.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2 rounded-lg flex-shrink-0">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{section.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="bg-gray-100 rounded-lg p-5 mb-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Need Help?</h2>
            <p className="text-gray-500 text-sm">Our support team is available 24/7</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center justify-center gap-2 p-3 bg-white rounded-lg">
              <FaEnvelope className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-semibold">support@luxestay.com</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 bg-white rounded-lg">
              <FaPhone className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Call</p>
                <p className="text-sm font-semibold">+92 300 1234567</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 bg-white rounded-lg">
              <FaMapMarkerAlt className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Address</p>
                <p className="text-sm font-semibold">Lahore, Pakistan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-4 text-center border-t pt-5 text-sm">
          <Link to="/terms" className="text-blue-600 font-semibold">Terms & Conditions</Link>
          <Link to="/privacy" className="text-gray-500 hover:text-blue-600 transition">Privacy Policy</Link>
          <Link to="/contact" className="text-gray-500 hover:text-blue-600 transition">Contact Us</Link>
          <Link to="/faq" className="text-gray-500 hover:text-blue-600 transition">FAQ</Link>
        </div>
      </div>
    </div>
  );
};

export default Terms;