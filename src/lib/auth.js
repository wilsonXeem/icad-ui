import { api, extractPayload } from './api';

export const registerUser = async (payload) => {
  const response = await api.post('/auth/register', payload);
  return extractPayload(response);
};

export const loginUser = async (payload) => {
  const response = await api.post('/auth/login', payload);
  return extractPayload(response);
};

export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  return extractPayload(response);
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return extractPayload(response);
};
