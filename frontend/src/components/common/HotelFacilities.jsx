import React from 'react';
import { 
  FaWifi, FaSwimmer, FaUtensils, FaDumbbell, 
  FaParking, FaCoffee, FaSnowflake, FaTv, 
  FaShieldAlt, FaConciergeBell, FaWheelchair,
  FaSmoking, FaChild, FaSpa, FaBriefcase,
  FaCar, FaBath, FaCut, FaApple
} from 'react-icons/fa';

const HotelFacilities = ({ amenities }) => {
  const facilityIcons = {
    'WiFi': { icon: <FaWifi />, label: 'Free WiFi' },
    'Swimming Pool': { icon: <FaSwimmer />, label: 'Swimming Pool' },
    'Restaurant': { icon: <FaUtensils />, label: 'Restaurant' },
    'Gym': { icon: <FaDumbbell />, label: 'Fitness Center' },
    'Parking': { icon: <FaParking />, label: 'Free Parking' },
    'Spa': { icon: <FaSpa />, label: 'Spa & Wellness' },
    'Business Center': { icon: <FaBriefcase />, label: 'Business Center' },
    'Air Conditioning': { icon: <FaSnowflake />, label: 'Air Conditioning' },
    'TV': { icon: <FaTv />, label: 'Flat Screen TV' },
    '24/7 Security': { icon: <FaShieldAlt />, label: '24/7 Security' },
    'Room Service': { icon: <FaConciergeBell />, label: 'Room Service' },
    'Wheelchair Access': { icon: <FaWheelchair />, label: 'Wheelchair Access' },
    'Non-Smoking Rooms': { icon: <FaSmoking />, label: 'Non-Smoking Rooms' },
    'Family Rooms': { icon: <FaChild />, label: 'Family Rooms' },
    'Coffee Shop': { icon: <FaCoffee />, label: 'Coffee Shop' },
    'Free Parking': { icon: <FaCar />, label: 'Free Parking' },
    'Bathroom': { icon: <FaBath />, label: 'Private Bathroom' },
    'Hair Dryer': { icon: <FaCut />, label: 'Hair Dryer' },
    'Breakfast': { icon: <FaApple />, label: 'Breakfast Included' }
  };

  const displayAmenities = amenities || ['WiFi', 'Restaurant', 'Parking', 'Air Conditioning'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Hotel Facilities</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {displayAmenities.slice(0, 12).map((amenity, index) => {
          const facility = facilityIcons[amenity] || { icon: '✓', label: amenity };
          return (
            <div key={index} className="flex items-center gap-2 text-gray-600 text-sm">
              <span className="text-blue-900">{facility.icon}</span>
              <span>{facility.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HotelFacilities;