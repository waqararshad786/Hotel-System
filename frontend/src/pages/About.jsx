import React from 'react';
import { FaHotel, FaUsers, FaTrophy, FaShieldAlt, FaHeart, FaGlobe } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaHotel className="text-5xl text-blue-900" />,
      title: 'Premium Hotels',
      description: 'Curated selection of finest hotels across Pakistan'
    },
    {
      icon: <FaUsers className="text-5xl text-blue-900" />,
      title: '24/7 Support',
      description: 'Round the clock customer service for your needs'
    },
    {
      icon: <FaTrophy className="text-5xl text-blue-900" />,
      title: 'Best Price Guarantee',
      description: 'We offer the most competitive rates'
    },
    {
      icon: <FaShieldAlt className="text-5xl text-blue-900" />,
      title: 'Secure Booking',
      description: 'Your transactions are 100% secure'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">About LuxeStay</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Pakistan's premier hotel booking platform, connecting travelers with the finest accommodations across the nation.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
            alt="Luxury Hotel"
            className="rounded-lg shadow-lg w-full h-96 object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2024, LuxeStay was born from a simple idea - to make luxury travel accessible to everyone in Pakistan. 
            We believed that everyone deserves to experience the finest hotels our beautiful country has to offer.
          </p>
          <p className="text-gray-600">
            Today, we've grown into Pakistan's most trusted hotel booking platform, partnering with over 100+ premium hotels 
            across major cities including Lahore, Karachi, Islamabad, and more.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-blue-50 rounded-lg p-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            To provide seamless, secure, and delightful hotel booking experiences while showcasing the best of Pakistani hospitality.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-900">100+</div>
          <p className="text-gray-600">Premium Hotels</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-900">10+</div>
          <p className="text-gray-600">Cities Covered</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-900">50k+</div>
          <p className="text-gray-600">Happy Customers</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-900">24/7</div>
          <p className="text-gray-600">Customer Support</p>
        </div>
      </div>

      {/* Values Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg">
            <FaHeart className="text-4xl text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Customer First</h3>
            <p className="text-gray-600">Your satisfaction is our top priority</p>
          </div>
          <div className="p-6 border rounded-lg">
            <FaGlobe className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
            <p className="text-gray-600">Real reviews, real experiences</p>
          </div>
          <div className="p-6 border rounded-lg">
            <FaTrophy className="text-4xl text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
            <p className="text-gray-600">Striving for the best always</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;