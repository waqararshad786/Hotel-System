import api from './api';

export const getDashboardStats = () => api.get('/admin/stats');
export const getAllBookings = (params) => api.get('/admin/bookings', { params });
export const updateBookingStatus = (id, status) => api.put(`/admin/bookings/${id}/status`, { status });
export const updatePaymentStatus = (id, paymentStatus) => api.put(`/admin/bookings/${id}/payment`, { paymentStatus });
export const getAllUsers = () => api.get('/admin/users');
export const getUserById = (id) => api.get(`/admin/users/${id}`);
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);
export const getAllHotelsAdmin = () => api.get('/admin/hotels/all');

// ✅ Admin cancel booking with email
export const adminCancelBooking = (id, cancellationReason) => api.put(`/admin/bookings/${id}/admin-cancel`, { cancellationReason });

export const deleteBooking = (id) => api.delete(`/admin/bookings/${id}`);

export const deleteHotel = (id) => api.delete(`/admin/hotels/${id}`);
export const deleteRoom = (id) => api.delete(`/admin/rooms/${id}`);

export const createHotel = (data) => api.post('/hotels', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const updateHotel = (id, data) => api.put(`/hotels/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const createRoom = (data) => api.post('/rooms', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const updateRoom = (id, data) => api.put(`/rooms/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});