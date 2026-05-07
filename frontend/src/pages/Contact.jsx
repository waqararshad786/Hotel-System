import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await api.post('/contact', formData);
      toast.success(response.data.message || 'Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact error:', error);
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-3xl text-blue-900" />,
      title: 'Visit Us',
      details: ['LuxeStay Head Office', 'Gulberg III, Lahore, Pakistan']
    },
    {
      icon: <FaPhone className="text-3xl text-blue-900" />,
      title: 'Call Us',
      details: ['+92 300 1234567', '+92 42 12345678']
    },
    {
      icon: <FaEnvelope className="text-3xl text-blue-900" />,
      title: 'Email Us',
      details: ['info@luxestay.com', 'support@luxestay.com']
    },
    {
      icon: <FaClock className="text-3xl text-blue-900" />,
      title: 'Working Hours',
      details: ['Monday - Friday: 9AM - 9PM', 'Saturday - Sunday: 10AM - 6PM']
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {contactInfo.map((info, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-4">{info.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
            {info.details.map((detail, i) => (
              <p key={i} className="text-gray-600">{detail}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Contact Form & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                placeholder="Enter your name"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                placeholder="your@email.com"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                placeholder="What is this regarding?"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                placeholder="Tell us how we can help..."
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-900 to-blue-800 text-white py-3 rounded-lg hover:from-blue-800 hover:to-blue-700 transition font-semibold"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Map & Social */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Us</h2>
            <div className="bg-gray-200 rounded-lg h-64 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217811.28591571082!2d74.22301675!3d31.482155700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e4e07d0f%3A0x9b2e2d4a9b14dab1!2sLahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="LuxeStay Location"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Follow Us</h2>
            <p className="text-gray-600 mb-4">Stay connected with us on social media</p>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition transform hover:scale-110">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="bg-sky-500 text-white p-3 rounded-full hover:bg-sky-600 transition transform hover:scale-110">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition transform hover:scale-110">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition transform hover:scale-110">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;