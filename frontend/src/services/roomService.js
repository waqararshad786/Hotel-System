import api from './api';

export const getRoomsByHotel = (hotelId) => api.get(`/rooms/hotel/${hotelId}`);
export const getRoomById = (id) => api.get(`/rooms/${id}`);

// For FormData uploads
export const createRoom = (data) => {
  return api.post('/rooms', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const updateRoom = (id, data) => {
  return api.put(`/rooms/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const deleteRoom = (id) => api.delete(`/rooms/${id}`);