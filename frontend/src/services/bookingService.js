import api from './api';

export const createBooking = (data) => api.post('/bookings', data);
export const getMyBookings = () => api.get('/bookings/my');
export const getBookingById = (id) => api.get(`/bookings/${id}`);
export const cancelBooking = (id, reason) => {
  console.log('Cancel API called with ID:', id, 'Reason:', reason);
  return api.put(`/bookings/${id}/cancel`, { reason });
};
export const checkAvailability = (params) => api.get('/bookings/check-availability', { params });