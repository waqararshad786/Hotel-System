import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaHeadset, FaTicketAlt, FaCreditCard, FaCalendarAlt, FaUserCircle, FaHotel } from 'react-icons/fa';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);

  const categories = [
    { id: 'all', name: 'All Questions', icon: <FaHotel />, color: 'bg-blue-900' },
    { id: 'booking', name: 'Bookings', icon: <FaTicketAlt />, color: 'bg-green-600' },
    { id: 'payment', name: 'Payments', icon: <FaCreditCard />, color: 'bg-purple-600' },
    { id: 'cancellation', name: 'Cancellation', icon: <FaCalendarAlt />, color: 'bg-orange-600' },
    { id: 'account', name: 'Account', icon: <FaUserCircle />, color: 'bg-pink-600' },
  ];

  const faqs = [
    {
      id: 1,
      category: 'booking',
      question: 'How do I book a hotel on LuxeStay?',
      answer: 'Booking a hotel is easy! Simply search for your desired destination, select a hotel, choose your room type, enter your details, and confirm your booking. You will receive a confirmation email with your booking details.',
      icon: '🏨'
    },
    {
      id: 2,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard), debit cards, and bank transfers. Cash on delivery is also available for select hotels.',
      icon: '💳'
    },
    {
      id: 3,
      category: 'cancellation',
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel your booking from your account dashboard. Cancellation policies vary by hotel, but most offer free cancellation up to 24-48 hours before check-in.',
      icon: '❌'
    },
    {
      id: 4,
      category: 'payment',
      question: 'How do I get a refund?',
      answer: 'Refunds are processed automatically to your original payment method within 5-7 business days after cancellation approval, subject to the hotel\'s cancellation policy.',
      icon: '💰'
    },
    {
      id: 5,
      category: 'booking',
      question: 'Is it safe to book through LuxeStay?',
      answer: 'Absolutely! We use industry-standard encryption and security measures to protect your personal and payment information. Your data is always safe with us.',
      icon: '🔒'
    },
    {
      id: 6,
      category: 'booking',
      question: 'Do you offer travel insurance?',
      answer: 'Currently, we do not offer travel insurance. However, many of our hotel partners offer flexible cancellation policies for your peace of mind.',
      icon: '🛡️'
    },
    {
      id: 7,
      category: 'account',
      question: 'How can I contact customer support?',
      answer: 'You can reach our 24/7 customer support team via email at support@luxestay.com, phone at +92 300 1234567, or through the contact form on our website.',
      icon: '📞'
    },
    {
      id: 8,
      category: 'booking',
      question: 'Can I modify my booking dates?',
      answer: 'Yes, you can modify your booking dates from your account dashboard, subject to room availability. Some changes may affect the total price.',
      icon: '📅'
    },
    {
      id: 9,
      category: 'account',
      question: 'Do you have a loyalty program?',
      answer: 'Yes! We offer a loyalty program where you earn points for every booking. These points can be redeemed for discounts on future stays.',
      icon: '⭐'
    },
    {
      id: 10,
      category: 'account',
      question: 'How do I become a partner hotel?',
      answer: 'If you own a hotel and want to partner with us, please contact our partnerships team at partners@luxestay.com for more information.',
      icon: '🤝'
    }
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 rounded-full p-3 mb-4">
            <FaHeadset className="text-blue-900 text-4xl" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Frequently Asked <span className="text-blue-900">Questions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about LuxeStay and our services
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? `${category.color} text-white shadow-lg transform scale-105`
                  : 'bg-white text-gray-700 hover:shadow-md hover:scale-105'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No FAQs found in this category.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, idx) => {
                const actualIndex = faqs.findIndex(f => f.id === faq.id);
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <button
                      onClick={() => toggleFAQ(actualIndex)}
                      className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{faq.icon}</div>
                        <span className="text-lg font-semibold text-gray-800">
                          {faq.question}
                        </span>
                      </div>
                      <div className={`transform transition-transform duration-300 ${openIndex === actualIndex ? 'rotate-180' : ''}`}>
                        {openIndex === actualIndex ? (
                          <FaChevronUp className="text-blue-900 text-xl" />
                        ) : (
                          <FaChevronDown className="text-gray-400 text-xl hover:text-blue-900" />
                        )}
                      </div>
                    </button>
                    
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openIndex === actualIndex ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-6 pt-0 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
                        <div className="flex gap-3">
                          <div className="w-1 bg-blue-900 rounded-full"></div>
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Still Have Questions Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Still Have Questions?
                </h2>
                <p className="text-blue-100 text-lg">
                  Can't find the answer you're looking for?
                </p>
              </div>
              <div className="flex gap-4">
                <a
                  href="/contact"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Contact Support
                </a>
                <a
                  href="/"
                  className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Helpful Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-2xl font-bold text-blue-900">24/7</div>
            <p className="text-gray-600 text-sm">Support Available</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-bold text-blue-900">&lt; 1hr</div>
            <p className="text-gray-600 text-sm">Average Response Time</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition">
            <div className="text-3xl mb-2">😊</div>
            <div className="text-2xl font-bold text-blue-900">98%</div>
            <p className="text-gray-600 text-sm">Customer Satisfaction</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition">
            <div className="text-3xl mb-2">🌍</div>
            <div className="text-2xl font-bold text-blue-900">10+</div>
            <p className="text-gray-600 text-sm">Cities Covered</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;