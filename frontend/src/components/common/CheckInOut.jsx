import React, { useState } from 'react';
import { FaClock, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';

const CheckInOut = ({ onDateChange, checkIn, checkOut, guests, onGuestsChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [state, setState] = useState([
    {
      startDate: checkIn ? new Date(checkIn) : new Date(),
      endDate: checkOut ? new Date(checkOut) : new Date(),
      key: 'selection'
    }
  ]);

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setState([ranges.selection]);
    if (onDateChange) {
      onDateChange({
        checkIn: startDate,
        checkOut: endDate
      });
    }
    if (startDate && endDate) {
      setShowDatePicker(false);
    }
  };

  const getNights = () => {
    if (!state[0].startDate || !state[0].endDate) return 0;
    const diffTime = Math.abs(state[0].endDate - state[0].startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaCalendarAlt className="text-blue-900" /> Check Availability
      </h3>
      
      {/* Check-in/Check-out */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm mb-1 flex items-center gap-1">
            <FaClock className="text-blue-900" size={12} /> Check-in
          </label>
          <div 
            className="border rounded-lg p-3 cursor-pointer hover:border-blue-900 transition"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <div className="font-medium">
              {state[0].startDate ? format(state[0].startDate, 'EEE, MMM d, yyyy') : 'Select date'}
            </div>
            <div className="text-xs text-gray-500">From 2:00 PM</div>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm mb-1 flex items-center gap-1">
            <FaClock className="text-blue-900" size={12} /> Check-out
          </label>
          <div 
            className="border rounded-lg p-3 cursor-pointer hover:border-blue-900 transition"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <div className="font-medium">
              {state[0].endDate ? format(state[0].endDate, 'EEE, MMM d, yyyy') : 'Select date'}
            </div>
            <div className="text-xs text-gray-500">Until 12:00 PM</div>
          </div>
        </div>
      </div>
      
      {/* Nights info */}
      {getNights() > 0 && (
        <div className="bg-blue-50 p-2 rounded-lg text-center mb-4">
          <span className="text-blue-900 font-semibold">{getNights()} nights</span>
        </div>
      )}
      
      {/* Guests */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-1">Guests</label>
        <select
          value={guests}
          onChange={(e) => onGuestsChange && onGuestsChange(parseInt(e.target.value))}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
        >
          {[1,2,3,4,5,6].map(num => (
            <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>
      
      {/* Date Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Select Dates</h3>
              <button 
                onClick={() => setShowDatePicker(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <DateRangePicker
              onChange={handleSelect}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={state}
              direction="horizontal"
              minDate={new Date()}
            />
          </div>
        </div>
      )}
      
      {/* Check-in/out Info */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
        <div className="flex items-start gap-2">
          <FaInfoCircle className="text-blue-900 mt-0.5" />
          <div>
            <p><strong>Check-in:</strong> 2:00 PM onwards</p>
            <p><strong>Check-out:</strong> 12:00 PM</p>
            <p><strong>Early check-in/Late check-out:</strong> Subject to availability</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInOut;