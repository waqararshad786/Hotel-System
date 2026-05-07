import React from 'react';
import { FaMapMarkerAlt, FaTaxi, FaWalking, FaCar } from 'react-icons/fa';

const NearbyAttractions = ({ city }) => {
  const attractions = {
    'Lahore': [
      { name: 'Badshahi Mosque', distance: '2.5 km', icon: '🕌', type: 'Historical' },
      { name: 'Food Street', distance: '1.8 km', icon: '🍽️', type: 'Food' },
      { name: 'Lahore Museum', distance: '3.2 km', icon: '🏛️', type: 'Cultural' },
      { name: 'Emporium Mall', distance: '4.0 km', icon: '🛍️', type: 'Shopping' },
      { name: 'Jilani Park', distance: '2.0 km', icon: '🌳', type: 'Park' }
    ],
    'Karachi': [
      { name: 'Clifton Beach', distance: '3.0 km', icon: '🏖️', type: 'Beach' },
      { name: 'Port Grand', distance: '5.5 km', icon: '🍽️', type: 'Food' },
      { name: 'Mohatta Palace', distance: '2.8 km', icon: '🏛️', type: 'Cultural' },
      { name: 'Dolmen Mall', distance: '4.2 km', icon: '🛍️', type: 'Shopping' },
      { name: 'Quaid-e-Azam Mausoleum', distance: '6.0 km', icon: '🕌', type: 'Historical' }
    ],
    'Islamabad': [
      { name: 'Faisal Mosque', distance: '3.5 km', icon: '🕌', type: 'Historical' },
      { name: 'Daman-e-Koh', distance: '6.0 km', icon: '🏔️', type: 'Viewpoint' },
      { name: 'Centaurus Mall', distance: '2.0 km', icon: '🛍️', type: 'Shopping' },
      { name: 'Lake View Park', distance: '8.0 km', icon: '🏞️', type: 'Park' },
      { name: 'Pakistan Monument', distance: '4.5 km', icon: '🏛️', type: 'Cultural' }
    ]
  };

  const cityAttractions = attractions[city] || attractions['Lahore'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaMapMarkerAlt className="text-blue-900" /> Nearby Attractions
      </h3>
      
      <div className="space-y-3">
        {cityAttractions.map((attraction, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{attraction.icon}</span>
              <div>
                <p className="font-semibold">{attraction.name}</p>
                <p className="text-xs text-gray-500">{attraction.type}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-blue-900">{attraction.distance}</p>
              <div className="flex gap-2 text-xs text-gray-500 mt-1">
                <span className="flex items-center gap-1"><FaWalking /> Walk</span>
                <span className="flex items-center gap-1"><FaCar /> Drive</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800 flex items-center gap-2">
          <FaTaxi /> Taxi service available from hotel reception
        </p>
      </div>
    </div>
  );
};

export default NearbyAttractions;