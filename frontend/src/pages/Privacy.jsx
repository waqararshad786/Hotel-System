import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaLock, FaDatabase, FaCookie, FaUserSecret, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaCheckCircle } from 'react-icons/fa';

const Privacy = () => {
  const sections = [
    {
      icon: <FaDatabase className="text-2xl text-blue-600" />,
      title: 'Information We Collect',
      content: 'We collect information you provide directly to us, such as when you create an account, make a booking, or contact customer support.'
    },
    {
      icon: <FaUserSecret className="text-2xl text-blue-600" />,
      title: 'How We Use Your Information',
      content: 'We use your information to process bookings, communicate with you, provide customer support, and improve our services.'
    },
    {
      icon: <FaLock className="text-2xl text-blue-600" />,
      title: 'Information Sharing',
      content: 'We share your information with hotels to facilitate your booking. We do not sell your personal information to third parties.'
    },
    {
      icon: <FaShieldAlt className="text-2xl text-blue-600" />,
      title: 'Data Security',
      content: 'We implement industry-standard security measures including encryption and secure servers to protect your personal information.'
    },
    {
      icon: <FaCookie className="text-2xl text-blue-600" />,
      title: 'Cookies & Tracking',
      content: 'We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.'
    },
    {
      icon: <FaGlobe className="text-2xl text-blue-600" />,
      title: 'International Data Transfers',
      content: 'Your information may be transferred to servers located outside your country with appropriate safeguards.'
    }
  ];

  const rights = [
    'Access your personal data',
    'Correct inaccurate data',
    'Delete your account',
    'Object to data processing',
    'Data portability',
    'Withdraw consent'
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 rounded-full p-3 mb-3">
            <FaShieldAlt className="text-blue-900 text-4xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Privacy <span className="text-blue-900">Policy</span>
          </h1>
          <p className="text-gray-600">Learn how we collect, use, and protect your information.</p>
          <div className="mt-2 inline-block bg-gray-100 rounded-full px-3 py-0.5">
            <p className="text-xs text-gray-500">Last updated: January 2025</p>
          </div>
        </div>

        {/* Introduction Card */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl p-5 mb-8 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-green-400 text-xl" />
            <h2 className="text-xl font-bold">Our Commitment to You</h2>
          </div>
          <p className="text-blue-100 text-sm leading-relaxed">
            At LuxeStay, we are committed to protecting your privacy and ensuring the security of your personal information.
          </p>
        </div>

        {/* Main Content Grid */}
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

        {/* Your Rights Section */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-8">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Your Privacy Rights</h2>
            <p className="text-gray-500 text-sm">You have control over your personal information</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {rights.map((right, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <FaCheckCircle className="text-green-500 text-sm" />
                <span className="text-gray-700 text-sm">{right}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-100 rounded-lg p-5 mb-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Questions About Privacy?</h2>
            <p className="text-gray-500 text-sm">Our privacy team is here to help</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center justify-center gap-2 p-3 bg-white rounded-lg">
              <FaEnvelope className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-semibold">privacy@luxestay.com</p>
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
          <Link to="/terms" className="text-gray-500 hover:text-blue-600 transition">Terms & Conditions</Link>
          <Link to="/privacy" className="text-blue-600 font-semibold">Privacy Policy</Link>
          <Link to="/contact" className="text-gray-500 hover:text-blue-600 transition">Contact Us</Link>
          <Link to="/faq" className="text-gray-500 hover:text-blue-600 transition">FAQ</Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;