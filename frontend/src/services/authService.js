import api from './api';

export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (email, password) => api.post('/auth/login', { email, password });
export const getCurrentUser = () => api.get('/auth/me');
export const updateProfile = (data) => api.put('/auth/update-profile', data);
export const changePassword = (data) => api.put('/auth/change-password', data);