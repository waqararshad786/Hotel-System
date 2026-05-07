import React, { useState, useEffect } from 'react';
import { FaUser, FaClock, FaHotel, FaTimes } from 'react-icons/fa';

const RecentBookings = () => {
  const [visible, setVisible] = useState(true);
  const [currentBooking, setCurrentBooking] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);
  
  // This component is optional - can be disabled if no real data
  // For now, we'll keep it but with empty data
  useEffect(() => {
    // In production, fetch real recent bookings from API
    // For now, keep empty to avoid dummy data
    setRecentBookings([]);
  }, []);

  if (!visible || recentBookings.length === 0) return null;

  return null; // Disabled until real data is available
};

export default RecentBookings;