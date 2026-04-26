import { api, extractPayload } from './api';

export const submitServiceRequest = async (payload) => {
  const response = await api.post('/service-requests', payload);
  return extractPayload(response);
};

export const getServiceRequests = async (params = {}) => {
  const response = await api.get('/service-requests', { params });
  return extractPayload(response);
};

export const updateServiceRequest = async (requestId, payload) => {
  const response = await api.patch(`/service-requests/${requestId}`, payload);
  return extractPayload(response);
};
