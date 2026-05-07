import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

const Alert = ({ type, message, onClose }) => {
  const types = {
    success: { icon: <FaCheckCircle />, bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
    error: { icon: <FaTimesCircle />, bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
    warning: { icon: <FaExclamationCircle />, bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
    info: { icon: <FaInfoCircle />, bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' }
  };

  const currentType = types[type] || types.info;

  return (
    <div className={`${currentType.bg} ${currentType.text} border ${currentType.border} rounded-lg p-4 mb-4 flex justify-between items-center`}>
      <div className="flex items-center gap-2">
        {currentType.icon}
        <span>{message}</span>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;