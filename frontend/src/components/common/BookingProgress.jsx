import React from 'react';
import { FaSearch, FaHotel, FaCreditCard, FaCheckCircle } from 'react-icons/fa';

const BookingProgress = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Search', icon: <FaSearch /> },
    { id: 2, name: 'Select Room', icon: <FaHotel /> },
    { id: 3, name: 'Payment', icon: <FaCreditCard /> },
    { id: 4, name: 'Confirmation', icon: <FaCheckCircle /> }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                currentStep >= step.id 
                  ? 'bg-blue-900 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {currentStep > step.id ? <FaCheckCircle /> : step.icon}
              </div>
              <span className={`text-xs mt-2 ${
                currentStep >= step.id ? 'text-blue-900 font-semibold' : 'text-gray-500'
              }`}>
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 ${
                currentStep > step.id ? 'bg-blue-900' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BookingProgress;