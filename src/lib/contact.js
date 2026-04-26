import { api, extractPayload } from './api';

export const submitContactInquiry = async (payload) => {
  const response = await api.post('/contact', payload);
  return extractPayload(response);
};

export const getContactInquiries = async (params = {}) => {
  const response = await api.get('/contact', { params });
  return extractPayload(response);
};

export const updateContactInquiryStatus = async (inquiryId, status) => {
  const response = await api.patch(`/contact/${inquiryId}/status`, { status });
  return extractPayload(response);
};
