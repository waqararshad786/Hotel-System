import React, { useState } from 'react';
import { FaBell, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const PriceAlert = ({ hotelId, hotelName, currentPrice }) => {
  const [showModal, setShowModal] = useState(false);
  const [targetPrice, setTargetPrice] = useState('');
  const [email, setEmail] = useState('');

  const handleSetAlert = () => {
    if (!targetPrice || !email) {
      toast.error('Please enter target price and email');
      return;
    }

    const alerts = JSON.parse(localStorage.getItem('priceAlerts') || '[]');
    alerts.push({
      hotelId,
      hotelName,
      currentPrice,
      targetPrice: parseInt(targetPrice),
      email,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('priceAlerts', JSON.stringify(alerts));
    
    toast.success(`Price alert set! We'll notify you when price drops below PKR ${parseInt(targetPrice).toLocaleString()}`);
    setShowModal(false);
    setTargetPrice('');
    setEmail('');
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 text-blue-900 border border-blue-900 px-3 py-2 rounded-lg hover:bg-blue-900 hover:text-white transition"
      >
        <FaBell /> Set Price Alert
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Set Price Alert</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">
              Get notified when {hotelName} price drops below your target
            </p>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Target Price (PKR)</label>
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                placeholder={`Current: PKR ${currentPrice?.toLocaleString()}`}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email for notification</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
            
            <button
              onClick={handleSetAlert}
              className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Set Alert
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PriceAlert;